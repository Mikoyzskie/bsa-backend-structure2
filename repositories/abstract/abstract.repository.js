class AbstractRepository {
  constructor({ db, model }) {
    this.db = db;
    this.model = model;
  }

  async getById(id) {
    const [users] = await this.db(this.model).where({ id }).returning("*");

    return { ...users };
  }
}

module.exports = { AbstractRepository };
