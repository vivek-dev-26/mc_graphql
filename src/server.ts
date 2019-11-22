import { ApolloServer } from "apollo-server";
import { User } from "./User";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDef";

const server = new ApolloServer({
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

server.listen(5000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
