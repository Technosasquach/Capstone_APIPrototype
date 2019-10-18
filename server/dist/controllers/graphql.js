"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
const express_1 = require("express");
const routes = express_1.Router();
const informationSchema_1 = require("./../graphql/informationSchema");
const nodeSchema_1 = require("./../graphql/nodeSchema");
const commentSchema_1 = require("./../graphql/commentSchema");
const courseSchema_1 = require("./../graphql/courseSchema");
const userSchema_1 = require("./../graphql/userSchema");
const accountSchema_1 = require("./../graphql/accountSchema");
// WE SHOULD IMPLEMENT THIS https://github.com/Urigo/graphql-scalars?source=post_page-----3f8a38965b53----------------------
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: Object.assign({}, informationSchema_1.InformationQueries, nodeSchema_1.NodeQueries, commentSchema_1.CommentQueries, courseSchema_1.CourseQueries, userSchema_1.UserQueries, accountSchema_1.AccountQueries)
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: Object.assign({}, informationSchema_1.InformationMutations, nodeSchema_1.NodeMutations, commentSchema_1.CommentMutations, userSchema_1.UserMutations, accountSchema_1.AccountMutations)
});
const RootSchema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
const root = { hello: () => 'Hello world!' };
routes.use('/graphql', (req, res) => {
    graphqlHTTP({
        schema: RootSchema,
        rootValue: root,
        graphiql: true,
        context: { req },
    })(req, res);
});
exports.default = routes;
//# sourceMappingURL=graphql.js.map