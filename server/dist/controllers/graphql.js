"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
const express_1 = require("express");
const routes = express_1.Router();
const informationSchema_1 = require("./../graphql/informationSchema");
const nodeSchema_1 = require("./../graphql/nodeSchema");
// WE SHOULD IMPLEMENT THIS https://github.com/Urigo/graphql-scalars?source=post_page-----3f8a38965b53----------------------
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: Object.assign({}, informationSchema_1.InformationQueries, nodeSchema_1.NodeQueries)
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign({}, informationSchema_1.InformationMutations, nodeSchema_1.NodeMutations)
});
const RootSchema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
const root = { hello: () => 'Hello world!' };
routes.use('/graphql', graphqlHTTP({
    schema: RootSchema,
    rootValue: root,
    graphiql: true,
}));
exports.default = routes;
//# sourceMappingURL=graphql.js.map