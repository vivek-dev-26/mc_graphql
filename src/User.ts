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
    return await this.get(`get`);
    }

  async getUser(id) {
     return await this.get(`get/${id}`);
    //const res = response.data
    //return res;
  }

  async createUser(details) {
    return await this.post("post", { ...details });
    //return response;
  }

  async updateUser(id, email, password) {
    return await this.put("put", {
      id,
      email,
      password
    });
    //return response;
  }

  async deleteUser(id) {
    try {
      return await this.delete(`delete/${id}`);
      //return response;
    } catch (error) {
      throw new ApolloError("You cannot delete user");
    }
  }
}
