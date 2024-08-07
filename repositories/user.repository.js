const knex = require("knex");
const dbConfig = require("../knexfile");
const db = dbConfig.development;

class UserRepository {
  constructor() {
    this.dbGetUserById = this.dbGetUserById.bind(this);
  }

  async dbGetUserById(req, res) {
    const [user] = await db("user").where("id", req.params.id).returning("*");
    return [user];
  }
}

module.export = new UserRepository();
