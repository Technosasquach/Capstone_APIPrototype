import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Comment } from '../database/comment.js';

export const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        contents: { type: new GraphQLNonNull(GraphQLString) },
        infoNodeId: { type: GraphQLString }
    })
});

export const CommentQueries = {
    everyComment: {
        type: new GraphQLList(CommentType),
        resolve() {
            return Comment.find({});
        }
    },
    commentsForNode: {
        type: new GraphQLList(CommentType),
        args: { infoNodeId: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Comment.find({infoNodeId : args.infoNodeId});
        }
    }
};

export const CommentMutations = {
    addComment: {
        type: CommentType,
        args: {
            contents: { type: new GraphQLNonNull(GraphQLString) },
            infoNodeId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            const comment = new Comment(args);
            return comment.save();
        }
    },
    updateComment: {
        type: CommentType,
        args: {
            id: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            contents: { type: new GraphQLNonNull(GraphQLString) },
            infoNodeId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            return Comment.findByIdAndUpdate(args.id, args);
        }
    },
    deleteComment: {
        type: CommentType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Comment.findByIdAndRemove(args.id);
        }
    }
}