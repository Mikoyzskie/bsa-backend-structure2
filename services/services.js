const { userRepository } = require("../repositories/repositories");
const UserService = require("./user/userService");

const userService = new UserService({
  userRepository,
});

module.exports = { userService };
