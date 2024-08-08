const { UserValidation } = require("../../middlewares/validations/validation");
const jwt = require("jsonwebtoken");
const { statEmitter } = require("../../db/db");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const initUser = (Router, services) => {
  const { userService } = services;
  const router = Router;

  router
    .get("/:id", UserValidation.validateUserId, (req, res, next) =>
      userService
        .getUserById(req.params.id)
        .then((data) => {
          if (!data.id) {
            res.status(404).send({ error: "User not found" });
          }
          res.send(data);
        })
        .catch(next)
    )
    .post("/", UserValidation.validateUserCreate, (req, res, next) => {
      req.body.balance = 0;
      userService
        .createUser(req.body)
        .then(([result]) => {
          result.createdAt = result.created_at;
          delete result.created_at;
          result.updatedAt = result.updated_at;
          delete result.updated_at;
          statEmitter.emit("newUser");

          res.send({
            ...result,
            accessToken: jwt.sign(
              { id: result.id, type: result.type },
              process.env.JWT_SECRET
            ),
          });
        })
        .catch((err) => {
          if (err.code == "23505") {
            res.status(400).send({
              error: err.detail,
            });
            next();
          }
        });
    })
    .put(
      "/:id",
      authMiddleware,
      UserValidation.validateUserUpdate,
      (req, res, next) => {
        if (req.params.id !== req.tokenPayload.id) {
          res.status(401).send({ error: "UserId mismatch" });
        }
        userService
          .updateById(req.params.id, req.body)
          .then(([result]) => {
            res.send({
              ...result,
            });
          })
          .catch((err) => {
            if (err.code == "23505") {
              console.log(err);
              res.status(400).send({
                error: err.detail,
              });
            }
            next();
          });
      }
    );

  return router;
};

module.exports = { initUser };
