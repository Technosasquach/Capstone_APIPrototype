import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Comment, User } from '../database/index';

const Username = new GraphQLObjectType({
    name: 'Username',
    fields: () => ({
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        editable: {type: GraphQLBoolean}
    })
})

export const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        contents: { type: new GraphQLNonNull(GraphQLString) },
        infoNodeId: { type: GraphQLString },
        userID: { 
            type: Username,
            async resolve(parent: any, args: any, context: any) {
                const token = context.req.signedCookies["jwt"];
                const auth = AuthenticationController.authenticateJWT(token);
                const temp = await User.findById(parent.userID);
                if(auth.valid) {
                    return {id: temp._id, username: temp.username, editable: auth.userID == temp._id};
                } else {
                    return {id: temp._id, username: temp.username, editable: false};
                }
            }
        }
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

import {AuthenticationController} from './../controllers/authentication';
export const CommentMutations = {
    addComment: {
        type: CommentType,
        args: {
            contents: { type: new GraphQLNonNull(GraphQLString) },
            infoNodeId: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parent: any, args: any, context: any) {
            const token = context.req.signedCookies["jwt"];
            const auth = AuthenticationController.authenticateJWT(token);
            if(auth.valid) {
                const comment = new Comment({...args, userID: auth.userID});
                return comment.save();
            }
            throw new Error();
        }
    },
    updateComment: {
        type: CommentType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLString)},
            contents: {type: new GraphQLNonNull(GraphQLString)},
            userID: {type: new GraphQLNonNull(GraphQLString)}
        },
        async resolve(parent: any, args: any, context: any) {
            const token = context.req.signedCookies["jwt"];
            const auth = AuthenticationController.authenticateJWT(token);
            if(auth.valid) {
                if(auth.userID == args.userID) {
                    return Comment.findByIdAndUpdate(args.id, {contents: args.contents}, {new: true});
                }
            }
            throw new Error();
        }
    },
    deleteComment: {
        type: CommentType,
        args: { 
            id: { type: GraphQLString},
            userID: {type: new GraphQLNonNull(GraphQLString)} 
        },
        resolve(parent: any, args: any, context: any) {
            const token = context.req.signedCookies["jwt"];
            const auth = AuthenticationController.authenticateJWT(token);
            if(auth.valid) {
                if(auth.userID == args.userID) {
                    return Comment.findByIdAndRemove(args.id);
                }
            }
            throw new Error();
        },
        
    }
}
