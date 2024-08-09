const { db } = require("../db/db");

const transactionRepo = (req, res, next) => {
  db("user")
    .where("id", req.body.userId)
    .then(([user]) => {
      if (!user) {
        return res.status(400).send({ error: "User does not exist" });
      }
      req.body.card_number = req.body.cardNumber;
      delete req.body.cardNumber;
      req.body.user_id = req.body.userId;
      delete req.body.userId;
      db("transaction")
        .insert(req.body)
        .returning("*")
        .then(([result]) => {
          var currentBalance = req.body.amount + user.balance;
          db("user")
            .where("id", req.body.user_id)
            .update("balance", currentBalance)
            .then(() => {
              ["user_id", "card_number", "created_at", "updated_at"].forEach(
                (whatakey) => {
                  var index = whatakey.indexOf("_");
                  var newKey = whatakey.replace("_", "");
                  newKey = newKey.split("");
                  newKey[index] = newKey[index].toUpperCase();
                  newKey = newKey.join("");
                  result[newKey] = result[whatakey];
                  delete result[whatakey];
                }
              );
              return res.send({
                ...result,
                currentBalance,
              });
            });
        });
    })
    .catch((err) => {
      next;
    });
};

module.exports = { transactionRepo };
