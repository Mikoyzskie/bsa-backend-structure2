const { ValidationMiddleware } = require("../abstract/abstract.validation");

class EventValidationMiddleware extends ValidationMiddleware {}

module.exports = { EventValidationMiddleware };
