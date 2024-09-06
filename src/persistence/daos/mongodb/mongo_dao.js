export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return await this.model.find({}).lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      //Check if code is already exists
      const productExist = await this.model.findOne({ code: obj.code });
      if (productExist) return { productExist: true, msg: "Code already exists. Code not created" };
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
