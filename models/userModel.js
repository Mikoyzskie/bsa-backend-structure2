const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

const User = {
  findById: async (id) => {
    const [user] = await db("user").where("id", id).returning("*");
    return user;
  },
};

module.exports = User;
