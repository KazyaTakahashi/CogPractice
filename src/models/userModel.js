const mongoose = require("mongoose");
const connectDatabase = require("../config/db");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  refreshTokenHash: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

class UserModel {
  static async findByEmail(email) {
    await connectDatabase();
    return User.findOne({ email: email.toLowerCase() });
  }

  static async findById(id) {
    await connectDatabase();
    return User.findById(id);
  }

  static async create(userData) {
    await connectDatabase();
    return User.create(userData);
  }

  static async updateRefreshToken(userId, refreshTokenHash) {
    await connectDatabase();
    return User.findByIdAndUpdate(userId, { $set: { refreshTokenHash } }, { new: true });
  }
}

module.exports = UserModel;
