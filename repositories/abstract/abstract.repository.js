class AbstractRepository {
  constructor({ db, model }) {
    this.db = db;
    this.model = model;
  }

  async getById(id) {
    const [users] = await this.db(this.model).where({ id }).returning("*");

    return { ...users };
  }

  create(data) {
    return this.db(this.model).insert(data).returning("*");
  }
}

module.exports = { AbstractRepository };
