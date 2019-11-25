"use strict";
exports.__esModule = true;
var express_1 = require("express");
var apollo_server_express_1 = require("apollo-server-express");
var body_parser_1 = require("body-parser");
var typeDef_1 = require("../typedefs/typeDef");
var resolvers_1 = require("../resolvers/resolvers");
var schema = {
    typeDefs: typeDef_1.typeDefs,
    resolvers: resolvers_1.resolvers
};
var GRAPHQL_PORT = 3000;
var graphQLServer = express_1["default"]();
var instance = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDef_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
graphQLServer.use('/graphql', body_parser_1["default"].json(), instance);
graphQLServer.listen(GRAPHQL_PORT, function () {
    return console.log("GraphiQL is now running on http://localhost:" + GRAPHQL_PORT + "/graphiql");
});
