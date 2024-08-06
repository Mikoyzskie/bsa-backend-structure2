var joi = require("joi");

const getUserByIdSchema = joi
  .object({
    id: joi.string().uuid(),
  })
  .required();

// const schema = joi
//   .object({
//     id: joi.string().uuid(),
//     type: joi.string().required(),
//     email: joi.string().email().required(),
//     phone: joi
//       .string()
//       .pattern(/^\+?3?8?(0\d{9})$/)
//       .required(),
//     name: joi.string().required(),
//     city: joi.string(),
//   })
//   .required();

module.exports = { getUserByIdSchema };
