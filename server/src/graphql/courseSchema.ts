import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Course, Quiz, Node, User } from '../database/index'
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

import { AuthenticationController } from '../controllers/authentication';
export const CourseMutations = {
    deleteCourse: {
        type: new GraphQLList(CourseType),
        args: {
            _id: {type: GraphQLString},
        },
        resolve(parent: any, args: any, context: any) {
            const token = context.req.signedCookies["jwt"];
            const auth = AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                if(auth.accessLevel == "ADMIN") {
                    User.find({coursesTaken: args._id}).then(res => {
                        res.forEach(element => {
                            User.findByIdAndUpdate({_id: element._id}, { $pull: { coursesTaken: { string: args._id } } })
                        });
                    });
                    User.find({coursesCompleted: args._id}).then(res => {
                        res.forEach(element => {
                            User.findByIdAndUpdate({_id: element._id}, { $pull: { coursesCompleted: { string: args._id } } })
                        });
                    });
                    return Course.findById({_id: args._id}).then(res => {
                        res.quizzes.map(quiz => {
                            Quiz.findByIdAndDelete({_id: quiz}).catch(() => {console.log("error")});
                        });
                        return Course.findByIdAndDelete({_id: args._id}).then(res => {
                            return Course.find({});
                        })
                    }).catch(() => {
                        throw new Error();
                    });
                }
            }
            throw new Error();
        }
    }
}