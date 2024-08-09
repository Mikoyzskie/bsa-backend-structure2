var express = require("express");

const Router = express.Router();

const { initApi } = require("./controllers/controller");

const { statEmitter, stats, db } = require("./db/db");

const {
  authMiddleware,
  authMiddlewareAdmin,
} = require("./middlewares/authMiddleware");

const {
  EventValidation,
  BetValidation,
  TransactionValidation,
} = require("./middlewares/validations/validation");

const { transactionRepo } = require("./repositories/transactionRepo");
const { eventPostRepo } = require("./repositories/eventPostRepo");
const { eventPutRepo } = require("./repositories/eventPutRepo");
const { betRepo } = require("./repositories/betRepo");

var app = express();

var port = 4066;

app.use(express.json());
app.use((uselessRequest, uselessResponse, neededNext) => {
  db.raw("select 1+1 as result")
    .then(function () {
      neededNext();
    })
    .catch(() => {
      throw new Error("No db connection");
    });
});

app.get("/health", (req, res) => {
  res.send("Hello World!");
});

app.use("/", initApi(Router));

app.post(
  "/transactions",
  TransactionValidation.transactionValidation,
  authMiddlewareAdmin,
  transactionRepo
);

app.post(
  "/events",
  EventValidation.validateEventCreate,
  authMiddlewareAdmin,
  eventPostRepo
);

app.post("/bets", BetValidation.betValidation, authMiddleware, betRepo);

app.put(
  "/events/:id",
  EventValidation.validateEventUpdate,
  authMiddlewareAdmin,
  eventPutRepo
);

app.get("/stats", authMiddlewareAdmin, (req, res, next) => {
  try {
    res.send(stats);
  } catch (err) {
    next;
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
  return;
});

const server = app.listen(port, () => {
  statEmitter.on("newUser", () => {
    stats.totalUsers++;
  });
  statEmitter.on("newBet", () => {
    stats.totalBets++;
  });
  statEmitter.on("newEvent", () => {
    stats.totalEvents++;
  });

  console.log(`App listening at http://localhost:${port}`);
});

// Do not change this line
module.exports = { app, server };
