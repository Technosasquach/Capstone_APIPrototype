import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Course, Quiz, Node } from '../database/index'
import {NodeType} from './nodeSchema';

export const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        nodeID: { type: new GraphQLNonNull(GraphQLString)},
        questions: { type: new GraphQLList(GraphQLString) },
        answer: { type: new GraphQLList(GraphQLString) },
        answers: { type: new GraphQLList(new GraphQLList(GraphQLString)) }
    })
})

export const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        name: {type: new GraphQLNonNull(GraphQLString)},
        nodes: {
            type: new GraphQLList(NodeType),
            resolve(parent, args) {
                return parent.nodes.map((id: string) => {
                    return Node.findById(id);
                });
            }
        },
        quizzes: {
            type: new GraphQLList(QuizType),
            resolve(parent, args) {
                return parent.quizzes.map((id: string) => {
                    return Quiz.findById(id);
                });
            }
        }
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
    myCourses: {
        type: CourseType,
        args: { id: { type: new GraphQLList(new GraphQLList(GraphQLString))}},
        resolve(parent: any, args: any) {
            return Course.findById({"$or":args.id});
        }
    }
};