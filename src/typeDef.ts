import { gql } from "apollo-server";

const typeDefs = gql`

 
  type User {
    _id: ID
    email: String
    password: String
    created:String
    _v:Int
  }

  type Create {
    message: String
    data: User
  }

  type Update {
    message: String
    data: Result
  }

  type Result {
    id: String
  }

  type Query {
    getUsers: [User!]
    getUser(id:ID!): User!
    getUserDetail(limit: Int, skip: Int): [User]
  }

  type Mutation {
    createUser(email: String, password: String): User!
    updateUser(id: String, email: String, password: String): Update
    deleteUser(id: String): Update
  }

  type Subscription {
    userCreated: Create
    userDeleted: Update
  }
`;

export { typeDefs };
