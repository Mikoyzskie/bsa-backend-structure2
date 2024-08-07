class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this._userRepository.getById(id);

    return user;
  }
}

module.exports = UserService;
