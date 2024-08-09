const joi = require("joi");

const {
  createTransactionSchema,
} = require("../../../schema/transactionSchema");

const transactionValidation = (req, res, next) => {
  const isValidResult = createTransactionSchema.validate(req.body);
  if (isValidResult.error) {
    return res
      .status(400)
      .send({ error: isValidResult.error.details[0].message });
  }

  next();
};

module.exports = { transactionValidation };
