import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { User, Account } from '../database/index';
import {AccountType} from './accountSchema';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: (GraphQLString) },
        username: { type: (GraphQLString) },
        coursesTaken: { type: new GraphQLList(GraphQLString) },
        coursesComplete: { type: new GraphQLList(GraphQLString) },
        history: { type: new GraphQLList(GraphQLString) },
        accessLevel: { type: (GraphQLString) },
        account: {
            type: AccountType,
            resolve(parent, args){
                return Account.findOne({username: parent.username});
            }
        }
    })
});

export const UserQueries = {
    everyUser: {
        type: new GraphQLList(UserType),
        resolve() {
            return User.find({});
        }
    },
    userByName: {
        type: new GraphQLList(UserType),
        args: { username: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return User.find({username : args.username}); //FindOne doesnt work
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