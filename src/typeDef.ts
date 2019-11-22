import { gql } from "apollo-server";

const typeDefs = gql`

  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    password: String
    phonenumber: ID
    brandname: String
    streetaddress: String
    city: String
    country: String
    postalcode: Int
    createdAt: String
    _v:Int
  }

  type Create {
    message: String
    data: User
  }

  type Auth {
    data: String
  }

  type Query {
    getUsers: [User!]
    login(email: String, password: String): Auth
  }

  type Mutation {
    createUser(name: String
      lastName: String
      email: String
      password: String
      phonenumber: ID
      brandname: String
      streetaddress: String
      city: String
      country: String
      postalcode: Int): User
  }

  type Subscription {
    userCreated: User
  }
`;

export { typeDefs };
