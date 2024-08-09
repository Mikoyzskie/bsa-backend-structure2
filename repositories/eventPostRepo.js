const { db, statEmitter } = require("../db/db");

const eventPostRepo = (req, res, next) => {
  try {
    req.body.odds.home_win = req.body.odds.homeWin;
    delete req.body.odds.homeWin;
    req.body.odds.away_win = req.body.odds.awayWin;
    delete req.body.odds.awayWin;
    db("odds")
      .insert(req.body.odds)
      .returning("*")
      .then(([odds]) => {
        delete req.body.odds;
        req.body.away_team = req.body.awayTeam;
        req.body.home_team = req.body.homeTeam;
        req.body.start_at = req.body.startAt;
        delete req.body.awayTeam;
        delete req.body.homeTeam;
        delete req.body.startAt;
        db("event")
          .insert({
            ...req.body,
            odds_id: odds.id,
          })
          .returning("*")
          .then(([event]) => {
            statEmitter.emit("newEvent");
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
            ["home_win", "away_win", "created_at", "updated_at"].forEach(
              (whatakey) => {
                var index = whatakey.indexOf("_");
                var newKey = whatakey.replace("_", "");
                newKey = newKey.split("");
                newKey[index] = newKey[index].toUpperCase();
                newKey = newKey.join("");
                odds[newKey] = odds[whatakey];
                delete odds[whatakey];
              }
            );
            return res.send({
              ...event,
              odds,
            });
          });
      });
  } catch (err) {
    next;
  }
};

module.exports = { eventPostRepo };
