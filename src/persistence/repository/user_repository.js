import factory from "../daos/factory.js";
import UserDTO from '../dto/user_dto.js';
const { userDao } = factory;

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUserById(id) {
        try {
          const user = await this.dao.getUserById(id);
          return new UserDTO(user);
        } catch (error) {
          throw new Error(error);
        }
    };
}