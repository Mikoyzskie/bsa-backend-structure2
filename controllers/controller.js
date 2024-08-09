const { initUser } = require("./user/user.controller");
const { initTransaction } = require("./transactions/transaction.controller");
const { userService, transactionService } = require("../services/services");

var express = require("express");

const initApi = (Router) => {
  const apiRouter = express.Router();

  apiRouter.use("/users", initUser(Router, { userService }));
  // apiRouter.use(
  //   "/transactions",
  //   initTransaction(Router, { userService, transactionService })
  // );

  return apiRouter;
};

module.exports = { initApi };
