import * as graphqlHTTP from 'express-graphql';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { Router, Request, Response, NextFunction } from "express";
const routes = Router();

import { InformationType, InformationQueries, InformationMutations } from "./../graphql/informationSchema";
import { NodeType, NodeQueries, NodeMutations } from "./../graphql/nodeSchema";
import {CourseQueries} from './../graphql/courseSchema';

// WE SHOULD IMPLEMENT THIS https://github.com/Urigo/graphql-scalars?source=post_page-----3f8a38965b53----------------------

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...InformationQueries,
        ...NodeQueries,
        ...CourseQueries
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...InformationMutations,
        ...NodeMutations
    }
});

const RootSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
  });

const root = { hello: () => 'Hello world!' };

routes.use('/graphql', graphqlHTTP({
    schema: RootSchema,
    rootValue: root,
    graphiql: true,
}));

export default routes;