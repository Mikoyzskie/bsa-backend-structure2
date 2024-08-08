const { UserValidation } = require("../../middlewares/validations/validation");
var ee = require("events");
var statEmitter = new ee();

const initUser = (Router, services) => {
  const { userService } = services;
  const router = Router;

  router.get("/:id", UserValidation.validateUserId, (req, res, next) =>
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
  // .post("/", UserValidation.validateUserCreate, (req, res, next) => {
  //   req.body.balance = 0;
  //   userService
  //     .createUser(req.body)
  //     .then((data) => {
  //       // statEmitter.emit("newUser");

  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       if (err.code == "23505") {
  //         res.status(400).send({
  //           error: err.detail,
  //         });
  //         next();
  //       }
  //     });
  // });

  return router;
};

module.exports = { initUser };
