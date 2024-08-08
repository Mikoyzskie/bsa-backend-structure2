var knex = require("knex");
const events = require("events");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
const statEmitter = new events();

const stats = {
  totalUsers: 3,
  totalBets: 1,
  totalEvents: 1,
};

module.exports = { db, statEmitter, stats };
