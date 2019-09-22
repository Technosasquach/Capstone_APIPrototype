"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const comment_js_1 = require("../database/comment.js");
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        infoNodeId: { type: graphql_1.GraphQLString }
    })
});
exports.CommentQueries = {
    everyComment: {
        type: new graphql_1.GraphQLList(exports.CommentType),
        resolve() {
            return comment_js_1.Comment.find({});
        }
    },
    commentsForNode: {
        type: new graphql_1.GraphQLList(exports.CommentType),
        args: { infoNodeId: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return comment_js_1.Comment.find({ infoNodeId: args.infoNodeId });
        }
    }
};
exports.CommentMutations = {
    addComment: {
        type: exports.CommentType,
        args: {
            id: { type: graphql_1.GraphQLString },
            contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            infoNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            const comment = new comment_js_1.Comment(args);
            return comment.save();
        }
    },
    updateComment: {
        type: exports.CommentType,
        args: {
            id: { type: graphql_1.GraphQLString },
            createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            infoNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            return comment_js_1.Comment.findByIdAndUpdate(args.id, args);
        }
    },
    deleteComment: {
        type: exports.CommentType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return comment_js_1.Comment.findByIdAndRemove(args.id);
        }
    }
};
//# sourceMappingURL=commentSchema.js.map