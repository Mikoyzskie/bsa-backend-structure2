const {
  validateTransactionCreate,
} = require("../../middlewares/validations/transcations/transaction.validation");

const { statEmitter } = require("../../db/db");
const {
  authMiddlewareAdmin,
  authMiddleware,
} = require("../../middlewares/authMiddleware");

const joi = require("joi");
const jwt = require("jsonwebtoken");

const initTransactions = (Router) => {
  //   const { userService, transactionService } = services;
  const router = Router;

  router.post(
    "/",

    (req, res, next) => res.send(console.log("bullshit"))
  );

  return router;
};

module.exports = { initTransactions };
