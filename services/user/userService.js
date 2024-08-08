const jwt = require("jsonwebtoken");
var ee = require("events");
var statEmitter = new ee();
class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getById(id);

    return user;
  }

  // async createUser(user) {
  //   const [createdUser] = await this._userRepository.create(user);

  //   createdUser.createdAt = createdUser.created_at;
  //   delete createdUser.created_at;
  //   createdUser.updatedAt = createdUser.updated_at;
  //   delete createdUser.updated_at;
  //   statEmitter.emit("newUser");
  //   const result = {
  //     ...createdUser,
  //     accessToken: jwt.sign(
  //       { id: result.id, type: result.type },
  //       process.env.JWT_SECRET
  //     ),
  //   };

  //   return result;
  // }
}

module.exports = UserService;
