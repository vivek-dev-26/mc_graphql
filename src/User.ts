import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
export class User extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = " http://localhost:3000/api/";
  }

  // willSendRequest(request) {
  //   request.headers.set("Authorization", this.context.token);
  // }

  async getUsers() {
    const response = await this.get("get");
    return response.data;
  }

  async getUser(id) {
    const response = await this.get(`/get/${id}`);
    const res = response.data
    return res;
  }

  async createUser(details) {
    const response = await this.post("post", { ...details });
    return response;
  }

  async updateUser(id, email, password) {
    const response = await this.put("put", {
      id,
      email,
      password
    });
    return response;
  }

  async deleteUser(id) {
    try {
      const response = await this.delete(`/delete/${id}`);
      return response;
    } catch (error) {
      throw new ApolloError("You cannot delete user");
    }
  }
}
