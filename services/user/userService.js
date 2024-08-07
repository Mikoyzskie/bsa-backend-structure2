const jwt = require("jsonwebtoken");

class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getById(id);

    return user;
  }

  async createUser(user) {
    const [createdUser] = await this._userRepository.create(user);

    const accessToken = jwt.sign(
      { id: user.id, type: user.type },
      process.env.JWT_SECRET
    );

    const result = {
      ...createdUser,
      accessToken,
    };

    return result;
  }
}

module.exports = UserService;
