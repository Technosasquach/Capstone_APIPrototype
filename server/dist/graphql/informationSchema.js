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
const information_js_1 = require("../database/information.js");
exports.InformationType = new graphql_1.GraphQLObjectType({
    name: 'Information',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        related: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLID)) },
        data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        nodeId: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
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
    },
    informationByNodeId: {
        type: new graphql_1.GraphQLList(exports.InformationType),
        args: { nodeId: { type: graphql_1.GraphQLString } },
        resolve(_parent, args) {
            return information_js_1.Information.find({ nodeId: args.nodeId });
        }
    },
    informationRandom: {
        type: exports.InformationType,
        resolve(_parent, args) {
            // // Get a random entry
            // var random = Math.floor(Math.random() * 100);
            // // Again query all users but only fetch one offset by our random #
            // return Information.findOne().skip(random).exec();
            return information_js_1.Information.countDocuments({}).then((res) => __awaiter(this, void 0, void 0, function* () {
                let data = {};
                do {
                    var random = Math.floor(Math.random() * (res));
                    data = yield information_js_1.Information.findOne().skip(random).exec();
                } while (data.type != "text");
                return data;
            }));
        }
    }
};
exports.InformationMutations = {
    addInformation: {
        type: exports.InformationType,
        args: {
            data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
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
            data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
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
    },
    addInformationNode: {
        type: exports.InformationType,
        args: {
            data: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            nodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
        },
        resolve(parent, args) {
            const information = new information_js_1.Information(args);
            return information.save();
        }
    },
};
//# sourceMappingURL=informationSchema.js.map