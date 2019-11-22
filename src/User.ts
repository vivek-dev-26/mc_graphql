import { RESTDataSource } from "apollo-datasource-rest";
export class User extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = " http://10.1.4.166:5000/v1/";
  }

  async getUsers() {
    const data = await this.get(`users`);
    return data.data;
  }

  async createUser(details) {
    return await this.post("register", { ...details });
  }

  async login(_, { email, password }) {
    const res = await this.post("authenticate", { email, password });
    return res;
  }
}
