const express = require("express");

import { dbMiddleware } from "./src/middlewares/middlewares";

const userController = require("./controllers/userController");
const transactionController = require("./controllers/transactionController");
const eventController = require("./controllers/eventController");
const betController = require("./controllers/betController");
const authMiddleware = require("./middlewares/authMiddleware");
const { statEmitter } = require("./utils/eventEmitter");

const app = express();
const port = 4066;

app.use(express.json());
app.use(dbMiddleware);

app.get("/health", (req, res) => res.send("Hello World!"));

app.use("/users", userController);
app.use("/transactions", transactionController);
app.use("/events", eventController);
app.use("/bets", betController);
app.use("/stats", authMiddleware.adminOnly, (req, res) => res.send(stats));

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

statEmitter.on("newUser", () => stats.totalUsers++);
statEmitter.on("newBet", () => stats.totalBets++);
statEmitter.on("newEvent", () => stats.totalEvents++);

module.exports = { app, server };
