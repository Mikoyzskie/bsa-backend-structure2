class AbstractRepository {
  constructor({ db, model }) {
    this.db = db;
    this.model = model;
  }

  async getById(id) {
    const [users] = await this.db(this.model).where("id", id).returning("*");

    return { ...users };
  }

  async updateUserBalance(id, balance) {
    const result = await this.db(this.model)
      .where("id", id)
      .update("balance", balance);

    return result;
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
