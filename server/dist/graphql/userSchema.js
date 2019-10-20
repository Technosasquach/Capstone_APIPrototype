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
const accountSchema_1 = require("./accountSchema");
const courseSchema_1 = require("./courseSchema");
const nodeSchema_1 = require("./nodeSchema");
const authentication_1 = require("../controllers/authentication");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: (graphql_1.GraphQLString) },
        username: { type: (graphql_1.GraphQLString) },
        coursesTaken: {
            type: new graphql_1.GraphQLList(courseSchema_1.CourseType),
            resolve(parent, arg) {
                return parent.coursesTaken.map((course) => {
                    return index_1.Course.findById({ _id: course });
                });
            }
        },
        coursesComplete: {
            type: new graphql_1.GraphQLList(courseSchema_1.CourseType),
            resolve(parent, arg) {
                return parent.coursesComplete.map((course) => {
                    return index_1.Course.findById({ _id: course });
                });
            }
        },
        viewed: {
            type: new graphql_1.GraphQLList(nodeSchema_1.NodeType),
            resolve(parent, arg) {
                return parent.viewed.map((node) => {
                    return index_1.Node.findById({ _id: node });
                });
            }
        },
        accessLevel: { type: (graphql_1.GraphQLString) },
        account: {
            type: accountSchema_1.AccountType,
            resolve(parent, args) {
                return index_1.Account.findOne({ username: parent.username });
            }
        }
    })
});
exports.UserQueries = {
    everyUser: {
        type: new graphql_1.GraphQLList(exports.UserType),
        resolve() {
            return index_1.User.find({});
        }
    },
    user: {
        type: exports.UserType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.User.findById({ _id: args.id });
        }
    },
    userByName: {
        type: exports.UserType,
        args: { username: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.User.findOne({ username: args.username }); //FindOne doesnt work
        }
    }
};
exports.UserMutations = {
    addLearnedNode: {
        type: exports.UserType,
        args: {
            nodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        },
        resolve(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = context.req.signedCookies["jwt"];
                const auth = authentication_1.AuthenticationController.authenticateJWT(token);
                if (auth.valid) {
                    if (auth.userID.length != (null || undefined)) {
                        return index_1.User.findByIdAndUpdate(auth.userID, { $addToSet: { history: args.nodeId } }, { new: true });
                    }
                }
                throw new Error();
            });
        }
    },
    updateCoursesTaken: {
        type: exports.UserType,
        args: {
            _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            coursesTaken: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
        },
        resolve(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = context.req.signedCookies["jwt"];
                const auth = authentication_1.AuthenticationController.authenticateJWT(token);
                if (auth.valid) {
                    if (auth.accessLevel == "ADMIN") {
                        return index_1.User.findByIdAndUpdate({ _id: args._id }, args, { new: true });
                    }
                }
                throw new Error();
            });
        }
    },
    updateCoursesComplete: {
        type: exports.UserType,
        args: {
            _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            coursesComplete: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) }
        },
        resolve(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = context.req.signedCookies["jwt"];
                const auth = authentication_1.AuthenticationController.authenticateJWT(token);
                if (auth.valid) {
                    if (auth.accessLevel == "ADMIN") {
                        return index_1.User.findByIdAndUpdate({ _id: args._id }, args, { new: true });
                    }
                }
                throw new Error();
            });
        }
    },
    deleteUser: {
        type: new graphql_1.GraphQLList(exports.UserType),
        args: {
            _id: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, context) {
            const token = context.req.signedCookies["jwt"];
            const auth = authentication_1.AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                if (auth.accessLevel == "ADMIN") {
                    index_1.Comment.find({ userID: args._id }).then(res => {
                        for (let i = 0; i < res.length; i++) {
                            index_1.Comment.findByIdAndDelete({ _id: res[i]._id }).catch(res => { console.log(res); });
                        }
                        ;
                    });
                    return index_1.User.findByIdAndDelete({ _id: args._id }).then(res => {
                        return index_1.User.find({});
                    }).catch(() => {
                        throw new Error();
                    });
                }
            }
            throw new Error();
        }
    },
    updateUser: {
        type: exports.UserType,
        args: {
            id: { type: graphql_1.GraphQLString },
            accessLevel: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return index_1.User.findByIdAndUpdate(args.id, args);
        }
    }
    //     addUser: {
    //         type: UserType,
    //         args: {
    //             username: { type: new GraphQLNonNull(GraphQLString) },
    //             password: { type: new GraphQLNonNull(GraphQLString) },
    //             accessLevel: { type: new GraphQLNonNull(GraphQLString) }
    //         },
    //         resolve(parent: any, args: any) {
    //             const user = new User(args);
    //             return user.save();
    //         }
    //     },
    // updateUser: {
    //     type: UserType,
    //     args: {
    //         id: { type: GraphQLString },
    //         createdAt: { type: new GraphQLNonNull(GraphQLString) },
    //         username: { type: new GraphQLNonNull(GraphQLString) },
    //         password: { type: new GraphQLNonNull(GraphQLString) },
    //         accessLevel: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent: any, args: any) {
    //         return User.findByIdAndUpdate(args.id, args);
    //     }
    // },
    //     deleteComment: {
    //         type: UserType,
    //         args: { id: { type: GraphQLString}},
    //         resolve(parent: any, args: any) {
    //             return User.findByIdAndRemove(args.id);
    //         }
    //     }
};
//# sourceMappingURL=userSchema.js.map