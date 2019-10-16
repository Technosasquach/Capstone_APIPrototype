import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
// import { Account } from '../database/account.js';
import { Account } from '../database/index.js';


export const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: {type: GraphQLString },
        username: {type: GraphQLString },
        firstname: {type: GraphQLString },
        lastname: {type: GraphQLString },
        email: {type: GraphQLString },
        position: {type: GraphQLString },
        phone: {type: GraphQLString}
    })
});

export const AccountQueries = {
    accountForUser: {
        type: AccountType,
        args: { username: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Account.find({username : args.username});
        }
    }
};

export const AccountMutations = {
    addAccount: {
        type: AccountType,
        args: {
            username: {type: GraphQLString },
            firstname: {type: GraphQLString },
            lastname: {type: GraphQLString },
            email: {type: GraphQLString },
            position: {type: GraphQLString },
            phone: {type: GraphQLString}
        },
        resolve(parent: any, args: any) {
            const account = new Account(args);
            return account.save();
        }
    },
    updateAccount: {
        type: AccountType,
        args: {
            id: { type: GraphQLString },
            username: {type: GraphQLString },
            firstname: {type: GraphQLString },
            lastname: {type: GraphQLString },
            email: {type: GraphQLString },
            position: {type: GraphQLString },
            phone: {type: GraphQLString}
        },
        resolve(parent: any, args: any) {
            return Account.findByIdAndUpdate(args.id, args);
        }
    },
    deleteAccount: {
        type: AccountType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Account.findByIdAndRemove(args.id);
        }
    }
}