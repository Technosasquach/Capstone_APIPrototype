"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const courses_1 = require("../database/courses");
const pages_1 = require("../database/pages");
exports.PageType = new graphql_1.GraphQLObjectType({
    name: 'Page',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString }
    })
});
exports.CourseType = new graphql_1.GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: graphql_1.GraphQLString },
        pages: {
            type: new graphql_1.GraphQLList(exports.PageType),
            resolve(parent, args) {
                return parent.pages.map((id) => {
                    return pages_1.Page.findById(id);
                });
            }
        },
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
    everyPage: {
        type: new graphql_1.GraphQLList(exports.PageType),
        resolve() {
            return pages_1.Page.find({});
        }
    },
    page: {
        type: exports.PageType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return pages_1.Page.findById(args.id);
        }
    },
};
//# sourceMappingURL=courseSchema.js.map