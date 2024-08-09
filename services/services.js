const {
  userRepository,
  transactionRepository,
} = require("../repositories/repositories");
const UserService = require("./user/userService");
const TransactionService = require("./transactions/transaction.service");

const userService = new UserService({
  userRepository,
});

const transactionService = new TransactionService({
  transactionRepository,
});

module.exports = { userService, transactionService };
