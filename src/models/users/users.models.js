const knex = require("knex");
const dbConfig = require("../config/dbConfig");
const db = knex(dbConfig);

exports.getUserById = (id) => db("user").where("id", id).first();

exports.createUser = async (userData) => {
  const [user] = await db("user").insert(userData).returning("*");
  user.createdAt = user.created_at;
  delete user.created_at;
  user.updatedAt = user.updated_at;
  delete user.updated_at;
  user.accessToken = jwt.sign(
    { id: user.id, type: user.type },
    process.env.JWT_SECRET
  );
  return user;
};

exports.updateUser = async (id, userData) => {
  const [user] = await db("user")
    .where("id", id)
    .update(userData)
    .returning("*");
  user.updatedAt = user.updated_at;
  delete user.updated_at;
  return user;
};
