exports.formatTransactionResponse = (transaction, currentBalance) => {
  const response = { ...transaction, currentBalance };

  ["user_id", "card_number", "created_at", "updated_at"].forEach((key) => {
    const newKey = key.replace(/_(.)/g, (match, p1) => p1.toUpperCase());
    response[newKey] = response[key];
    delete response[key];
  });

  return response;
};
