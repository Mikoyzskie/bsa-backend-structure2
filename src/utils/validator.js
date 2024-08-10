const joi = require("joi");

exports.validateUserId = (data) =>
  joi.object({ id: joi.string().uuid() }).validate(data);

exports.validateUserCreation = (data) =>
  joi
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
    .validate(data);

exports.validateUserUpdate = (data) =>
  joi
    .object({
      email: joi.string().email(),
      phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
      name: joi.string(),
      city: joi.string(),
    })
    .validate(data);
