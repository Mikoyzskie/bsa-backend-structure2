var joi = require("joi");

const getUserByIdSchema = joi
  .object({
    id: joi.string().uuid(),
  })
  .required();

const createUserSchema = joi
  .object({
    id: joi.string().uuid(),
    type: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .pattern(/^\+?3?8?(0\d{9})$/)
      .required(),
    name: joi.string().required(),
    city: joi.string(),
  })
  .required();

const updateUserSchema = joi
  .object({
    email: joi.string().email(),
    phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
    name: joi.string(),
    city: joi.string(),
  })
  .required();

module.exports = { getUserByIdSchema, createUserSchema, updateUserSchema };
