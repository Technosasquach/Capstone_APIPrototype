"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const index_1 = require("../database/index");
const Username = new graphql_1.GraphQLObjectType({
    name: 'Username',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        editable: { type: graphql_1.GraphQLBoolean }
    })
});
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        infoNodeId: { type: graphql_1.GraphQLString },
        userID: {
            type: Username,
            resolve(parent, args, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    const token = context.req.signedCookies["jwt"];
                    const auth = authentication_1.AuthenticationController.authenticateJWT(token);
                    const temp = yield index_1.User.findById(parent.userID);
                    if (auth.valid) {
                        return { id: temp._id, username: temp.username, editable: auth.userID == temp._id };
                    }
                    else {
                        return { id: temp._id, username: temp.username, editable: false };
                    }
                });
            }
        }
    })
});
exports.CommentQueries = {
    everyComment: {
        type: new graphql_1.GraphQLList(exports.CommentType),
        resolve() {
            return index_1.Comment.find({});
        }
    },
    commentsForNode: {
        type: new graphql_1.GraphQLList(exports.CommentType),
        args: { infoNodeId: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.Comment.find({ infoNodeId: args.infoNodeId });
        }
    }
};
const authentication_1 = require("./../controllers/authentication");
exports.CommentMutations = {
    addComment: {
        type: exports.CommentType,
        args: {
            contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            infoNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        },
        resolve(parent, args, context) {
            const token = context.req.signedCookies["jwt"];
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                const comment = new index_1.Comment(Object.assign({}, args, { userID: auth.userID }));
                return comment.save();
            }
            throw new Error();
        }
    },
    updateComment: {
        type: exports.CommentType,
        args: {
            id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            contents: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            userID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = context.req.signedCookies["jwt"];
                const auth = authentication_1.AuthenticationController.authenticateJWT(token);
                if (auth.valid) {
                    if (auth.userID == args.userID) {
                        return index_1.Comment.findByIdAndUpdate(args.id, { contents: args.contents }, { new: true });
                    }
                }
                throw new Error();
            });
        }
    },
    deleteComment: {
        type: exports.CommentType,
        args: {
            id: { type: graphql_1.GraphQLString },
            userID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args, context) {
            const token = context.req.signedCookies["jwt"];
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                if (auth.userID == args.userID) {
                    return index_1.Comment.findByIdAndRemove(args.id);
                }
            }
            throw new Error();
        },
    }
};
//# sourceMappingURL=commentSchema.js.map