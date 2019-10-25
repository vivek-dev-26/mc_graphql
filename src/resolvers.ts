import fetch from "node-fetch";
import { PubSub } from "apollo-server";

const user_Added = "USER_ADDED";
const user_Deleted = "USER_DELETED";
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    // getTraineeFetch: async () => {
    //   const response = await fetch(
    //     "https://express-training.herokuapp.com/api/user/me",
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization:
    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNmQ2NTNiYTA4YzE5MDA1MjM1ZWE1MiIsImlhdCI6MTU2NjE5OTU1OH0.qpj-PzdgZC2uKi_cUH4AXH3ZUIwVs5tCYwisUziuXmw"
    //       }
    //     }
    //   );
    //   const res = await response.json();
    //   return res.data;
    // },
    getUsers: (_, __, { dataSources }) => {
      return dataSources.user.getUser();
    },
    getUser: async (_, {id}, { dataSources }) => {
      return await dataSources.trainee.getTraineeDetails(id);
    }
  },

  Mutation: {
    createUser: async (_, { name, email, password }, { dataSources }) => {

      const res = dataSources.trainee.createTrainee({name, email, password});
      await pubsub.publish(user_Added, { userCreated: res });
      return res;
    },
    updateUser: (_, { id, name, email }, { dataSources }) => {
      return dataSources.trainee.updateTrainee(id, name, email);
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      const res = dataSources.trainee.deleteTrainee(id);
      await pubsub.publish(user_Deleted, { userDeleted: res });
      return res;
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
