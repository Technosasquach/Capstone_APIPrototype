"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const index_1 = require("../database/index");
const nodeSchema_1 = require("./nodeSchema");
const informationSchema_1 = require("./informationSchema");
const commentSchema_1 = require("./commentSchema");
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
        },
        info: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLList(informationSchema_1.InformationType)),
            resolve(parent, args) {
                return parent.nodes.map((id) => {
                    return index_1.Information.find({ nodeId: id });
                });
            }
        },
        comments: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLList(commentSchema_1.CommentType)),
            resolve(parent, args) {
                return parent.nodes.map((id) => {
                    return index_1.Comment.find({ infoNodeId: id });
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
};
//# sourceMappingURL=courseSchema.js.map