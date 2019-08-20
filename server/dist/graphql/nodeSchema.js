"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const nodes_js_1 = require("../database/nodes.js");
exports.NodeType = new graphql_1.GraphQLObjectType({
    name: 'Node',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        depth: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        json: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        parents: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
        children: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) }
    })
});
exports.NodeQueries = {
    everyNode: {
        type: new graphql_1.GraphQLList(exports.NodeType),
        resolve() {
            return nodes_js_1.Node.find({});
        }
    },
    node: {
        type: exports.NodeType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return nodes_js_1.Node.findById(args.id);
        }
    }
};
exports.NodeMutations = {
    addNode: {
        type: exports.NodeType,
        args: {
            id: { type: graphql_1.GraphQLString },
            createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            depth: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            json: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            parents: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
            children: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) }
        },
        resolve(parent, args) {
            const node = new nodes_js_1.Node(args);
            return node.save();
        }
    },
    updateNode: {
        type: exports.NodeType,
        args: {
            id: { type: graphql_1.GraphQLString },
            createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            depth: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            json: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
            parents: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
            children: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) }
        },
        resolve(parent, args) {
            return nodes_js_1.Node.findByIdAndUpdate(args.id, args);
        }
    },
    deleteNode: {
        type: exports.NodeType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return nodes_js_1.Node.findByIdAndRemove(args.id);
        }
    }
};
//# sourceMappingURL=nodeSchema.js.map