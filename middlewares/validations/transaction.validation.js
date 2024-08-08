const { createTransactionSchema } = require("../../schema/transactionSchema");

const validateTransactionCreate = (req, res, next) => {
  const { error } = createTransactionSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateTransactionCreate };
