"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const courses_1 = require("../database/courses");
exports.CourseType = new graphql_1.GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        nodes: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
    })
});
exports.CourseQueries = {
    everyCourse: {
        type: new graphql_1.GraphQLList(exports.CourseType),
        resolve() {
            return courses_1.Course.find({});
        }
    },
    course: {
        type: exports.CourseType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return courses_1.Course.findById(args.id);
        }
    },
};
//# sourceMappingURL=courseSchema.js.map