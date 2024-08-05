const joi = require("joi");
const jwt = require("jsonwebtoken");
const transactionRepository = require("../repositories/transactionRepository");
const userRepository = require("../repositories/userRepository");

const schema = joi
  .object({
    id: joi.string().uuid(),
    userId: joi.string().uuid().required(),
    cardNumber: joi.string().required(),
    amount: joi.number().min(0).required(),
  })
  .required();

exports.createTransaction = async (transactionData, authorizationHeader) => {
  // Validate request body
  const { error } = schema.validate(transactionData);
  if (error) {
    throw error;
  }

  // Validate token
  let token = authorizationHeader;
  if (!token) {
    throw new Error("Not Authorized");
  }
  token = token.replace("Bearer ", "");
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenPayload.type !== "admin") {
      throw new Error();
    }
  } catch (err) {
    throw new Error("Not Authorized");
  }

  // Check if user exists
  const user = await userRepository.findUserById(transactionData.userId);
  if (!user) {
    throw new Error("User does not exist");
  }

  // Process transaction
  transactionData.card_number = transactionData.cardNumber;
  delete transactionData.cardNumber;
  transactionData.user_id = transactionData.userId;
  delete transactionData.userId;

  const result = await transactionRepository.insertTransaction(transactionData);

  const currentBalance = transactionData.amount + user.balance;
  await userRepository.updateUserBalance(
    transactionData.user_id,
    currentBalance
  );

  // Rename keys for response
  Object.keys(result).forEach((key) => {
    if (key.includes("_")) {
      const newKey = key
        .replace("_", "")
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        );
      result[newKey] = result[key];
      delete result[key];
    }
  });

  return { ...result, currentBalance };
};
