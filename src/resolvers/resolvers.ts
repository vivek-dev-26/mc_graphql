import { PubSub } from "apollo-server";

const user_Added = "USER_ADDED";
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getUsers: (_, __, { dataSources }) => {
      return dataSources.user.getUsers({ dataSources });
    },
    login: async (_, { email, password }, { dataSources }) => {
      const res = await dataSources.user.login(_, { email, password }, { dataSources });
      return res;
    }
  },

  Mutation: {
    createUser: async (_, { name, lastName, email, password, phonenumber, brandname, streetaddress, city, country, postalcode }, { dataSources }) => {
      console.log(dataSources);
      const res = await dataSources.user.createUser({ name, lastName, email, password, phonenumber, brandname, streetaddress, city, country, postalcode });
      await pubsub.publish(user_Added, { userCreated: res.data });
      return res.data;
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([user_Added])
    },
  }
};
