import fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import { resolvers } from '../resolvers/resolvers'
import { typeDefs } from '../typedefs/typeDef'


const gqlServerLogin = {
  query: `
      type Auth {
        data: String
      }
      query {
        login(email: String, password: String): Auth
      }
    }
    `,
  variables: {},

  // expected result 
  expected: {
    "data": {
      "login": {
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyYUBnbWFpbC5jb20iLCJpYXQiOjE1NzQ0MTU5MzQsImV4cCI6MTU3NDQxNjkzNH0.f1maNgt8qK8zvFOOi6lnUUwXUeCMaxzdQpKp2GD5iYY"
      }
    }
  }
}

describe('My Test Cases', () => {

  const cases = [gqlServerLogin]
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  cases.forEach(obj => {
    const { query, variables, expected } = obj

    test(`query: login(email: "sra@gmail.com", password: "@!23") {
            data
          }`, async () => {
      const result = await graphql(schema, query, null, variables)
      return expect(result).toEqual(expected)
    })
  })
})