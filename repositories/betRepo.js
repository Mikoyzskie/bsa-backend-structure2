const { db, statEmitter } = require("../db/db");

const betRepo = (req, res, next) => {
  let userId = req.tokenPayload.id;
  try {
    req.body.event_id = req.body.eventId;
    req.body.bet_amount = req.body.betAmount;
    delete req.body.eventId;
    delete req.body.betAmount;
    req.body.user_id = userId;
    db.select()
      .table("user")
      .then((users) => {
        var user = users.find((u) => u.id == userId);
        if (!user) {
          res.status(400).send({ error: "User does not exist" });
          return;
        }
        if (+user.balance < +req.body.bet_amount) {
          return res.status(400).send({ error: "Not enough balance" });
        }
        db("event")
          .where("id", req.body.event_id)
          .then(([event]) => {
            if (!event) {
              return res.status(404).send({ error: "Event not found" });
            }
            db("odds")
              .where("id", event.odds_id)
              .then(([odds]) => {
                if (!odds) {
                  return res.status(404).send({ error: "Odds not found" });
                }
                let multiplier;
                switch (req.body.prediction) {
                  case "w1":
                    multiplier = odds.home_win;
                    break;
                  case "w2":
                    multiplier = odds.away_win;
                    break;
                  case "x":
                    multiplier = odds.draw;
                    break;
                }
                db("bet")
                  .insert({
                    ...req.body,
                    multiplier,
                    event_id: event.id,
                  })
                  .returning("*")
                  .then(([bet]) => {
                    var currentBalance = user.balance - req.body.bet_amount;
                    db("user")
                      .where("id", userId)
                      .update({
                        balance: currentBalance,
                      })
                      .then(() => {
                        statEmitter.emit("newBet");
                        [
                          "bet_amount",
                          "event_id",
                          "away_team",
                          "home_team",
                          "odds_id",
                          "start_at",
                          "updated_at",
                          "created_at",
                          "user_id",
                        ].forEach((whatakey) => {
                          var index = whatakey.indexOf("_");
                          var newKey = whatakey.replace("_", "");
                          newKey = newKey.split("");
                          newKey[index] = newKey[index].toUpperCase();
                          newKey = newKey.join("");
                          bet[newKey] = bet[whatakey];
                          delete bet[whatakey];
                        });
                        return res.send({
                          ...bet,
                          currentBalance: currentBalance,
                        });
                      });
                  });
              });
          });
      });
  } catch (err) {
    next;
  }
};

module.exports = { betRepo };
