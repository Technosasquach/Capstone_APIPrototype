"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const index_1 = require("../database/index");
const nodeSchema_1 = require("./nodeSchema");
exports.QuizType = new graphql_1.GraphQLObjectType({
    name: 'Quiz',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        nodeID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        questions: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        answer: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        answers: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLList(graphql_1.GraphQLString)) }
    })
});
exports.CourseType = new graphql_1.GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        nodes: {
            type: new graphql_1.GraphQLList(nodeSchema_1.NodeType),
            resolve(parent, args) {
                return parent.nodes.map((id) => {
                    return index_1.Node.findById(id);
                });
            }
        },
        quizzes: {
            type: new graphql_1.GraphQLList(exports.QuizType),
            resolve(parent, args) {
                return parent.quizzes.map((id) => {
                    return index_1.Quiz.findById(id);
                });
            }
        }
    })
});
exports.CourseQueries = {
    everyCourse: {
        type: new graphql_1.GraphQLList(exports.CourseType),
        resolve() {
            return index_1.Course.find({});
        }
    },
    course: {
        type: exports.CourseType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.Course.findById(args.id);
        }
    },
    myCourses: {
        type: exports.CourseType,
        args: { id: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLList(graphql_1.GraphQLString)) } },
        resolve(parent, args) {
            return index_1.Course.findById({ "$or": args.id });
        }
    }
};
const authentication_1 = require("../controllers/authentication");
exports.CourseMutations = {
    deleteCourse: {
        type: new graphql_1.GraphQLList(exports.CourseType),
        args: {
            _id: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, context) {
            const token = context.req.signedCookies["jwt"];
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                if (auth.accessLevel == "ADMIN") {
                    index_1.User.find({ coursesTaken: args._id }).then(res => {
                        res.forEach(element => {
                            index_1.User.findByIdAndUpdate({ _id: element._id }, { $pull: { coursesTaken: { string: args._id } } });
                        });
                    });
                    index_1.User.find({ coursesCompleted: args._id }).then(res => {
                        res.forEach(element => {
                            index_1.User.findByIdAndUpdate({ _id: element._id }, { $pull: { coursesCompleted: { string: args._id } } });
                        });
                    });
                    return index_1.Course.findById({ _id: args._id }).then(res => {
                        res.quizzes.map(quiz => {
                            index_1.Quiz.findByIdAndDelete({ _id: quiz }).catch(() => { console.log("error"); });
                        });
                        return index_1.Course.findByIdAndDelete({ _id: args._id }).then(res => {
                            return index_1.Course.find({});
                        });
                    }).catch(() => {
                        throw new Error();
                    });
                }
            }
            throw new Error();
        }
    }
};
//# sourceMappingURL=courseSchema.js.map