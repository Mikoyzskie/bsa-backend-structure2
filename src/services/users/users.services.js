const db = require("../models/userModel");
const {
  validateUserId,
  validateUserCreation,
  validateUserUpdate,
} = require("../utils/validator");
const { statEmitter } = require("../utils/eventEmitter");

exports.getUserById = async (req, res) => {
  try {
    const { error } = validateUserId(req.params);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await db.getUserById(req.params.id);
    if (!user) return res.status(404).send({ error: "User not found" });

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUserCreation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await db.createUser(req.body);
    statEmitter.emit("newUser");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const updatedUser = await db.updateUser(req.params.id, req.body);
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
