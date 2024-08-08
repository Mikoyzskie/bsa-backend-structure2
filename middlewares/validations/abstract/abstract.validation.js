class ValidationMiddleware {
  constructor({ schema, content }) {
    this.schema = schema;
    this.content = content;
  }

  validateSchema(req, res, next) {
    const { error } = this.schema.validate(this.content);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    next();
  }
}

module.exports = { ValidationMiddleware };
