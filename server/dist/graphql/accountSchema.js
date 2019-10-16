"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// import { Account } from '../database/account.js';
const index_js_1 = require("../database/index.js");
exports.AccountType = new graphql_1.GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        firstname: { type: graphql_1.GraphQLString },
        lastname: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString }
    })
});
exports.AccountQueries = {
    accountForUser: {
        type: exports.AccountType,
        args: { username: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_js_1.Account.find({ username: args.username });
        }
    }
};
exports.AccountMutations = {
    addAccount: {
        type: exports.AccountType,
        args: {
            username: { type: graphql_1.GraphQLString },
            firstname: { type: graphql_1.GraphQLString },
            lastname: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            position: { type: graphql_1.GraphQLString },
            phone: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            const account = new index_js_1.Account(args);
            return account.save();
        }
    },
    updateAccount: {
        type: exports.AccountType,
        args: {
            id: { type: graphql_1.GraphQLString },
            username: { type: graphql_1.GraphQLString },
            firstname: { type: graphql_1.GraphQLString },
            lastname: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            position: { type: graphql_1.GraphQLString },
            phone: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args) {
            return index_js_1.Account.findByIdAndUpdate(args.id, args);
        }
    },
    deleteAccount: {
        type: exports.AccountType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_js_1.Account.findByIdAndRemove(args.id);
        }
    }
};
//# sourceMappingURL=accountSchema.js.map