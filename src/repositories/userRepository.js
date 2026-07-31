const UserModel = require("../models/userModel");

class UserRepository {
  async findByEmail(email) {
    return UserModel.findByEmail(email);
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async create(userData) {
    return UserModel.create(userData);
  }

  async updateRefreshToken(userId, refreshTokenHash) {
    return UserModel.updateRefreshToken(userId, refreshTokenHash);
  }
}

module.exports = new UserRepository();
