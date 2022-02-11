const GithubUser = require('../models/GithubUser.js');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async createSignedUser({ login, email, avatar_url }) {
    // ON SECURITY AND GRABBING A USER OBJECT BY USERNAME.
    // Our table designates the username column as a primary key, meaning it must be unique in the table.
    // Github also doesn't allow duplicate usernames, thus our app has double security.
    let user = await GithubUser.findByUsername(login);

    if (!user) {
      user = await GithubUser.insert({
        username: login,
        email,
        avatar: avatar_url,
      });
    }

    return jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }
};
