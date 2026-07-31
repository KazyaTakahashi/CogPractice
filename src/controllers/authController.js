const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const session = await authService.register(req.body);
      res.status(201).json(session);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async login(req, res) {
    try {
      const session = await authService.login(req.body);
      res.json(session);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async refresh(req, res) {
    try {
      const session = await authService.refreshSession(req.body.refreshToken);
      res.json(session);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async logout(req, res) {
    try {
      await authService.logout(req.body.refreshToken);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async me(req, res) {
    try {
      const profile = await authService.getProfile(req.user.sub);
      res.json(profile);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  handleError(error, res) {
    const message = error.message || "Unexpected error";

    if (message === "Invalid credentials") {
      return res.status(401).json({ error: message });
    }

    if (message === "Invalid refresh token" || message === "Session invalidated") {
      return res.status(401).json({ error: message });
    }

    if (message === "User already exists") {
      return res.status(409).json({ error: message });
    }

    const userErrorMessages = [
      "Email and password are required",
      "Name, email, and password are required",
      "Password must be at least 8 characters",
      "Invalid email format",
      "Refresh token is required",
      "Session not found"
    ];

    if (userErrorMessages.includes(message)) {
      return res.status(400).json({ error: message });
    }

    if (message === "User not found") {
      return res.status(404).json({ error: message });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = new AuthController();
