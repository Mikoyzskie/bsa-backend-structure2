const knex = require("knex");
const dbConfig = require("../knexfile");
var db = knex(dbConfig.development);
const { UserRepository } = require("./user/user.repository");

const userRepository = new UserRepository({
  db,
  model: "user",
});

module.exports = { userRepository };
