const Joi = require("joi");
const eventService = require("../services/eventService");

exports.createEvent = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().uuid(),
      type: Joi.string().required(),
      homeTeam: Joi.string().required(),
      awayTeam: Joi.string().required(),
      startAt: Joi.date().required(),
      odds: Joi.object({
        homeWin: Joi.number().min(1.01).required(),
        awayWin: Joi.number().min(1.01).required(),
        draw: Joi.number().min(1.01).required(),
      }).required(),
    }).required();

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const result = await eventService.createEvent(req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
