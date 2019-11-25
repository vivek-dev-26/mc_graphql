import { RESTDataSource } from "apollo-datasource-rest";
export class User extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL;
  }

  async getUsers(details) {
    const data = await this.get('users/list', { ...details });
    return data.data;
  }

  async createUser(details) {
    return await this.post("register", { ...details });
  }

  async login(_, { email, password }) {
    const res = await this.post("login", { email, password });
    return res;
  }
}
