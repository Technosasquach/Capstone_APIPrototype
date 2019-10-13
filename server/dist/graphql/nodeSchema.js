"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const index_1 = require("../database/index");
const informationSchema_1 = require("./informationSchema");
const commentSchema_1 = require("./commentSchema");
exports.NodeType = new graphql_1.GraphQLObjectType({
    name: 'Node',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        createdAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        depth: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        json: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        parents: {
            type: new graphql_1.GraphQLList(exports.NodeType),
            resolve(parent, args) {
                return parent.parents.map((id) => {
                    return index_1.Node.findById(id);
                });
            }
        },
        children: {
            type: new graphql_1.GraphQLList(exports.NodeType),
            resolve(parent, args) {
                return parent.children.map((id) => {
                    return index_1.Node.findById(id);
                });
            }
        },
        info: {
            type: new graphql_1.GraphQLList(informationSchema_1.InformationType),
            resolve(parent, args) {
                return index_1.Information.find({ nodeId: parent.id });
            }
        },
        comments: {
            type: new graphql_1.GraphQLList(commentSchema_1.CommentType),
            resolve(parent, args) {
                return index_1.Comment.find({ infoNodeId: parent.id });
            }
        }
    })
});
exports.NodeQueries = {
    everyNode: {
        type: new graphql_1.GraphQLList(exports.NodeType),
        resolve() {
            return index_1.Node.find({});
        }
    },
    node: {
        type: exports.NodeType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.Node.findById(args.id);
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
            const node = new index_1.Node(args);
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
            return index_1.Node.findByIdAndUpdate(args.id, args);
        }
    },
    deleteNode: {
        type: exports.NodeType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args) {
            return index_1.Node.findByIdAndRemove(args.id);
        }
    }
};
//# sourceMappingURL=nodeSchema.js.map