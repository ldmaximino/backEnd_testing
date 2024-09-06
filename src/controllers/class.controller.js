//Local imports
import { httpResponse } from "../utils/httpResponse.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.service.getAll();
      return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = req.params.pid;
      const data = await this.service.getById(id);
      if (!data) return httpResponse.Not_Found(res, data);
      else return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      //If the user role is 'premium' add the email to the 'owner' product property
      const { email, role } = req.user;
      if (role === "premium") req.body = { ...req.body, owner: email };
      //
      const data = await this.service.create(req.body);
      if(data.productExist) return httpResponse.UnAuth(res, data);
      return httpResponse.Created(res, data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = req.params.pid;
      //If the user role is 'premium' and the email to the 'owner' does not correspond to 'premium', you cannot update the product
      if (req.user.role === "premium") {
        const product = await this.service.getById(id);
        if (req.user.email !== product.owner)
          return httpResponse.Forbidden(
            res,
            "User with 'premium' role can only update products created by himself."
          );
      }
      //
      const data = await this.service.update(id, req.body);
      if (!data) return httpResponse.Not_Found(res, data);
      else return httpResponse.Updated(res, data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = req.params.pid;
      //If the user role is 'premium' and the email to the 'owner' does not correspond to 'premium', you cannot delete the product
      if (req.user.role === "premium") {
        const product = await this.service.getById(id);
        if (req.user.email !== product.owner)
          return httpResponse.Forbidden(
            res,
            "User with 'premium' role can only delete products created by himself."
          );
      }
      //
      const data = await this.service.delete(id);
      if (!data) return httpResponse.Not_Found(res, data);
      else return httpResponse.Deleted(res, data);
    } catch (error) {
      next(error);
    }
  };
}
