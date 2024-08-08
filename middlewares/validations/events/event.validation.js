const {
  createEventSchema,
  updateEventSchema,
} = require("../../../schema/eventSchema");

const validateEventCreate = (req, res, next) => {
  const { error } = createEventSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

const validateEventUpdate = (req, res, next) => {
  const { error } = updateEventSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateEventCreate, validateEventUpdate };
