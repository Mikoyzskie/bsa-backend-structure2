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

  async updateById(id, data) {
    const result = await this.db(this.model)
      .where({ id })
      .update({
        ...data,
        updated_at: new Date(),
      })
      .returning("*");

    return result;
  }
}

module.exports = { AbstractRepository };
