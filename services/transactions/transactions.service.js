class TransactionService {
  constructor({ transactionRepository }) {
    this._transactionRepository = transactionRepository;
  }

  async createTransaction(transaction) {
    const createdTransaction = await this._transactionRepository.create(
      transaction
    );

    return createdTransaction;
  }
}

module.exports = TransactionService;
