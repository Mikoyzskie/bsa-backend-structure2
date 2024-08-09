const {
  TransactionValidation,
} = require("../../middlewares/validations/validation");
const jwt = require("jsonwebtoken");
const { statEmitter } = require("../../db/db");
const { authMiddlewareAdmin } = require("../../middlewares/authMiddleware");

const initTransaction = (Router, services) => {
  const { userService, transactionService } = services;
  const router = Router;

  router.post(
    "/",
    TransactionValidation.transactionValidation,
    authMiddlewareAdmin,
    (req, res, next) => {
      console.log(req.body);
      next;
    }
  );

  return router;
};

module.exports = { initTransaction };
