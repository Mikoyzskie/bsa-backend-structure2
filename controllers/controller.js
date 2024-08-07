const { initUser } = require("./user/user.controller");
const { userService } = require("../services/services");
var express = require("express");

const initApi = (Router) => {
  const apiRouter = express.Router();

  apiRouter.use("/users", initUser(Router, { userService }));

  return apiRouter;
};

module.exports = { initApi };
