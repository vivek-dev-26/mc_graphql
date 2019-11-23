import { RESTDataSource } from "apollo-datasource-rest";
export class User extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL;
  }

  async getUsers() {
    const data = await this.get('users/list');
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
