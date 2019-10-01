import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Course } from '../database/courses'
import { Comment } from '../database/comment'

export const PageType = new GraphQLObjectType({
    name: 'Page',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        content: {type: GraphQLString},
        image: {type: GraphQLString}
    })
})

export const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        name: {type: GraphQLString},

    })
});

export const CourseQueries = {
    everyCourse: {
        type: new GraphQLList(CourseType),
        resolve() {
            return Course.find({});
        }
    },
    course: {
        type: CourseType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Course.findById(args.id);
        }
    },
};