const {
  createTransactionSchema,
} = require("../../../schema/transactionSchema");

const validateTransactionCreate = (req, res, next) => {
  var isValidResult = createTransactionSchema.validate(req.body);
  if (isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
  }
  next();
};

module.exports = { validateTransactionCreate };
