import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { typeDefs } from '../typedefs/typeDef'
import { resolvers } from '../resolvers/resolvers'

const schema = {
    typeDefs,
    resolvers
}
const GRAPHQL_PORT = 3000

const graphQLServer = express()
const instance = new ApolloServer({
    typeDefs,
    resolvers
});
graphQLServer.use('/graphql', bodyParser.json(), instance)

graphQLServer.listen(GRAPHQL_PORT, () =>
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
)