import fetch from "node-fetch";
import { PubSub } from "apollo-server";

const user_Added = "USER_ADDED";
const user_Deleted = "USER_DELETED";
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getUsers: (_, __, { dataSources }) => {
      return dataSources.user.getUsers();
    },
    getUser: async (_, {id}, { dataSources }) => {
      return await dataSources.user.getUser(id);
    }
  },

  Mutation: {
    createUser: async (_, { email, password }, { dataSources }) => {

      const res = dataSources.user.createUser({email, password});
      await pubsub.publish(user_Added, { userCreated: res });
      return res;
    },
    updateUser: (_, { id,email,password }, { dataSources }) => {
      return dataSources.user.updateUser(id, email,password);
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return await dataSources.user.deleteUser(id);
      //await pubsub.publish(user_Deleted, { userDeleted: res });
     /// return res;
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([user_Added])
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator([user_Deleted])
    }
  }
};
