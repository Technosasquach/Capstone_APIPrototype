"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const information_js_1 = require("../database/information.js");
exports.InformationType = new graphql_1.GraphQLObjectType({
    name: 'Information',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        related: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLID)) },
        text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
exports.InformationQueries = {
    everyInformation: {
        type: new graphql_1.GraphQLList(exports.InformationType),
        resolve() {
            return information_js_1.Information.find({});
        }
    },
    information: {
        type: exports.InformationType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return information_js_1.Information.findById(args.id);
        }
    }
};
exports.InformationMutations = {
    addInformation: {
        type: exports.InformationType,
        args: {
            id: { type: graphql_1.GraphQLString },
            createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            related: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLID)) },
            text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            const information = new information_js_1.Information(args);
            return information.save();
        }
    },
    updateInformation: {
        type: exports.InformationType,
        args: {
            id: { type: graphql_1.GraphQLString },
            createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            related: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLID)) },
            text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            return information_js_1.Information.findByIdAndUpdate(args.id, args);
        }
    },
    deleteInformation: {
        type: exports.InformationType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return information_js_1.Information.findByIdAndRemove(args.id);
        }
    }
};
//# sourceMappingURL=informationSchema.js.map