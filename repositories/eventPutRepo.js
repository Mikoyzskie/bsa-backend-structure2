const { db, statEmitter } = require("../db/db");

const eventPutRepo = (req, res, next) => {
  try {
    var eventId = req.params.id;

    db("bet")
      .where("event_id", eventId)
      .andWhere("win", null)
      .then((bets) => {
        var [w1, w2] = req.body.score.split(":");
        let result;
        if (+w1 > +w2) {
          result = "w1";
        } else if (+w2 > +w1) {
          result = "w2";
        } else {
          result = "x";
        }
        db("event")
          .where("id", eventId)
          .update({ score: req.body.score })
          .returning("*")
          .then(([event]) => {
            Promise.all(
              bets.map((bet) => {
                if (bet.prediction == result) {
                  db("bet").where("id", bet.id).update({
                    win: true,
                  });
                  db("user")
                    .where("id", bet.user_id)
                    .then(([user]) => {
                      return db("user")
                        .where("id", bet.user_id)
                        .update({
                          balance:
                            user.balance + bet.bet_amount * bet.multiplier,
                        });
                    });
                } else if (bet.prediction != result) {
                  return db("bet").where("id", bet.id).update({
                    win: false,
                  });
                }
              })
            );
            setTimeout(() => {
              [
                "bet_amount",
                "event_id",
                "away_team",
                "home_team",
                "odds_id",
                "start_at",
                "updated_at",
                "created_at",
              ].forEach((whatakey) => {
                var index = whatakey.indexOf("_");
                var newKey = whatakey.replace("_", "");
                newKey = newKey.split("");
                newKey[index] = newKey[index].toUpperCase();
                newKey = newKey.join("");
                event[newKey] = event[whatakey];
                delete event[whatakey];
              });
              res.send(event);
            }, 1000);
          });
      });
  } catch (err) {
    next;
  }
};

module.exports = { eventPutRepo };
