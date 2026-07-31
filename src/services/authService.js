const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev_access_secret_change_me";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev_refresh_secret_change_me";
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

class AuthService {
  async register({ name, email, password }) {
    this.validateRegisterPayload({ name, email, password });

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash
    });

    return this.createSessionForUser(user);
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await userRepository.findByEmail(normalizedEmail);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    return this.createSessionForUser(user);
  }

  async refreshSession(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (_error) {
      throw new Error("Invalid refresh token");
    }

    const user = await userRepository.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      throw new Error("Session not found");
    }

    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!tokenMatches) {
      throw new Error("Session invalidated");
    }

    return this.createSessionForUser(user);
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      return;
    }

    try {
      const payload = jwt.verify(refreshToken, REFRESH_SECRET);
      await userRepository.updateRefreshToken(payload.sub, null);
    } catch (_error) {
      // Ignore invalid token on logout so client can always clear local state.
    }
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  validateRegisterPayload({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  async createSessionForUser(user) {
    const accessToken = jwt.sign(
      { role: "user" },
      ACCESS_SECRET,
      { subject: String(user.id), expiresIn: ACCESS_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { type: "refresh" },
      REFRESH_SECRET,
      { subject: String(user.id), expiresIn: REFRESH_EXPIRES_IN }
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    await userRepository.updateRefreshToken(user.id, refreshTokenHash);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}

module.exports = new AuthService();
