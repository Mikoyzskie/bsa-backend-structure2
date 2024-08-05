const { db } = require("../../index");

exports.insertOdds = async (odds) => {
  return db("odds").insert(odds).returning("*");
};

exports.insertEvent = async (event) => {
  return db("event").insert(event).returning("*");
};
