class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getById(id);

    return user;
  }

  async createUser(user) {
    const createdUser = await this._userRepository.create(user);

    return createdUser;
  }

  async updateBalanceByid(id, newBalance) {
    const updatedBalance = await this._userRepository.updateUserBalance(
      id,
      newBalance
    );

    return updatedBalance;
  }

  async updateById(id, user) {
    const updatedUser = await this._userRepository.updateById(id, user);

    return updatedUser;
  }
}

module.exports = UserService;
