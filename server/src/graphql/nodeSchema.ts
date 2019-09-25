import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Node } from '../database/nodes.js';
import { InformationType } from './informationSchema';

export const NodeType:any = new GraphQLObjectType({
    name: 'Node',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        depth: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        json: { type: new GraphQLNonNull(GraphQLString) },
        keywords: { type: new GraphQLList(GraphQLString) },
        parents: { 
            type: new GraphQLList(GraphQLID) 
            // type: new GraphQLList(NodeType),
            // resolve(parent, args) {
            //     return parent.children.map((id: string) => {
            //         return Node.findById(id);
            //     });
            // }
        },
        children: {
            type: new GraphQLList(GraphQLID) 
            // type: new GraphQLList(NodeType),
            // resolve(parent, args) {
            //     return parent.children.map((id: string) => {
            //         return Node.findById(id);
            //     });
            // }
         }
    })
});

export const NodeQueries = {
    everyNode: {
        type: new GraphQLList(NodeType),
        resolve() {
            return Node.find({});
        }
    },
    node: {
        type: NodeType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Node.findById(args.id);
        }
    }
};

export const NodeMutations = {
    addNode: {
        type: NodeType,
        args: {
            id: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            depth: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            json: { type: new GraphQLNonNull(GraphQLString) },
            keywords: { type: new GraphQLList(GraphQLString) },
            parents: { type: new GraphQLList(GraphQLID) },
            children: { type: new GraphQLList(GraphQLID) }
        },
        resolve(parent: any, args: any) {
            const node = new Node(args);
            return node.save();
        }
    },
    updateNode: {
        type: NodeType,
        args: {
            id: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            depth: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            json: { type: new GraphQLNonNull(GraphQLString) },
            keywords: { type: new GraphQLList(GraphQLString) },
            parents: { type: new GraphQLList(GraphQLID) },
            children: { type: new GraphQLList(GraphQLID) }
        },
        resolve(parent: any, args: any) {
            return Node.findByIdAndUpdate(args.id, args);
        }
    },
    deleteNode: {
        type: NodeType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Node.findByIdAndRemove(args.id);
        }
    }
}