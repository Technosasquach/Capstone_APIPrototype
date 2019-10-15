"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const index_1 = require("../database/index");
const accountSchema_1 = require("./accountSchema");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: (graphql_1.GraphQLString) },
        username: { type: (graphql_1.GraphQLString) },
        coursesTaken: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        coursesComplete: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        history: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
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
    userByName: {
        type: new graphql_1.GraphQLList(exports.UserType),
        args: { username: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.User.find({ username: args.username });
        }
    }
};
// export const UserMutations = {
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
//     updateUser: {
//         type: UserType,
//         args: {
//             id: { type: GraphQLString },
//             createdAt: { type: new GraphQLNonNull(GraphQLString) },
//             username: { type: new GraphQLNonNull(GraphQLString) },
//             password: { type: new GraphQLNonNull(GraphQLString) },
//             accessLevel: { type: new GraphQLNonNull(GraphQLString) }
//         },
//         resolve(parent: any, args: any) {
//             return User.findByIdAndUpdate(args.id, args);
//         }
//     },
//     deleteComment: {
//         type: UserType,
//         args: { id: { type: GraphQLString}},
//         resolve(parent: any, args: any) {
//             return User.findByIdAndRemove(args.id);
//         }
//     }
// }
//# sourceMappingURL=userSchema.js.map