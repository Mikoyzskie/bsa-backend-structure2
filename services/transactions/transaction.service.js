class TransactionService {
  constructor({ transactionRepository }) {
    this._transactionRepository = transactionRepository;
  }

  async createTransaction(data) {
    const createdTransaction = await this._transactionRepository.create(data);

    return createdTransaction;
  }
}

module.exports = TransactionService;
