var ee = require("events");
var statEmitter = new ee();
const jwt = require("jsonwebtoken");

const {
  validateUserId,
  validateUserCreate,
} = require("../../middlewares/validations/user.validation");

const initUser = (Router, services) => {
  const { userService } = services;
  const router = Router;

  router.get("/:id", validateUserId, (req, res, next) =>
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
