class UserController {
  constructor() {
    this.getById = this.getById.bind(this);
  }

  async getById(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
}
