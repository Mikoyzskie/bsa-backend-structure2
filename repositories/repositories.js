const knex = require("knex");
const dbConfig = require("../knexfile");
var db = knex(dbConfig.development);
const { UserRepository } = require("./user/user.repository");
const {
  TransactionRepository,
} = require("./transactions/transaction.repository");

const userRepository = new UserRepository({
  db,
  model: "user",
});

const transactionRepository = new TransactionRepository({
  db,
  model: "transaction",
});

module.exports = { userRepository, transactionRepository };
