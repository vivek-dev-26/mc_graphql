import { ApolloServer } from "apollo-server";
import { User } from "./services/User";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./typedefs/typeDef";
import { IConfig } from "../src/config/IConfig";

export default class Server {
  public PORT: number;
  constructor(config: IConfig) {
    this.PORT = config.PORT || 4000;
  }
  start() {
    let server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req, connection }) => {
        if (connection) {
          return connection.context;
        } else {
          const token = req.headers.authorization || "";
          return { token };
        }
      },
      dataSources: () => ({
        user: new User()
      })
    });
    server.listen(this.PORT).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
}

