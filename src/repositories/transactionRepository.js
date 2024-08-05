const { getDb } = require("../../index");

exports.insertTransaction = async (transactionData) => {
  const db = getDb();
  try {
    const [result] = await db("transaction")
      .insert(transactionData)
      .returning("*");
    return result;
  } catch (err) {
    throw err;
  }
};
