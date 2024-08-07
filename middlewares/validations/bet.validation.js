const { betSchema } = require("../../schema/betSchema");

const betValidation = (req, res, next) => {
  var isValidResult = betSchema.validate(req.body);
  if (isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  }

  next();
};

module.exports = { betValidation };
