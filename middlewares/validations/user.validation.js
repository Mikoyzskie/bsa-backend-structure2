const {
  getUserByIdSchema,
  createUserSchema,
  updateUserSchema,
} = require("../../schema/userSchema");

const validateUserId = (req, res, next) => {
  const { error } = getUserByIdSchema.validate(req.params);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

const validateUserCreate = (req, res, next) => {
  const { error } = createUserSchema.validate(req.params);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};
const validateUserUpdate = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateUserId, validateUserCreate, validateUserUpdate };
