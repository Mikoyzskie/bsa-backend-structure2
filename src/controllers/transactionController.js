const transactionService = require("../services/transactionService");

exports.createTransaction = async (req, res) => {
  try {
    const result = await transactionService.createTransaction(
      req.body,
      req.headers.authorization
    );
    return res.send(result);
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).send({ error: err.details[0].message });
    }
    if (
      err.message === "Not Authorized" ||
      err.message === "User does not exist"
    ) {
      return res.status(401).send({ error: err.message });
    }
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
