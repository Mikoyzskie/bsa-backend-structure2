const { initUser } = require("./user/user.controller");
const { initTransactions } = require("./transactions/transaction.controller");
const { userService, transactionService } = require("../services/services");

var express = require("express");

const initApi = (Router) => {
  const apiRouter = express.Router();

  apiRouter.use("/users", initUser(Router, { userService }));
  // apiRouter.use("/transactions", initTransactions(Router));

  return apiRouter;
};

module.exports = { initApi };
