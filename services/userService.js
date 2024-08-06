const User = require("../models/userModel");
const { getUserByIdSchema } = require("../schema/userSchema");

const getUserById = async (req, res) => {
  try {
    const isValid = getUserByIdSchema.validate(req.params);
    if (isValid.error) {
      res.status(400).send({ error: isValidResult.error.details[0].message });
      return;
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getUserById };
