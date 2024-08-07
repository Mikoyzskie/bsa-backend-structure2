const { getUserByIdSchema } = require("../../schema/userSchema");

function validateSchema(req, res, next) {
  const { error } = getUserByIdSchema.validate(req.params);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
}

const initUser = (Router, services) => {
  const { userService } = services;
  const router = Router;

  router.get("/:id", validateSchema, (req, res, next) =>
    userService
      .getUserById(req.params.id)
      .then((data) => {
        if (!data.id) {
          res.status(404).send({ error: "User not found" });
        }
        res.send(data);
      })
      .catch(next)
  );

  return router;
};

module.exports = { initUser };
