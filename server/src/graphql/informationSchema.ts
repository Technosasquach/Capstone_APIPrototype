import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Information } from '../database/information.js';

export const InformationType = new GraphQLObjectType({
    name: 'Information',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        related: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        data: { type: new GraphQLNonNull(GraphQLString) },
        nodeId: { type: GraphQLString },
        type: { type: GraphQLString },
    })
});

export const InformationQueries = {
    everyInformation: {
        type: new GraphQLList(InformationType),
        resolve() {
            return Information.find({});
        }
    },
    information: {
        type: InformationType,
        args: { id: { type: GraphQLString } },
        resolve(parent: any, args: any) {
            return Information.findById(args.id);
        }
    },
    informationByNodeId: {
        type: new GraphQLList(InformationType),
        args: { nodeId: { type: GraphQLString } },
        resolve(_parent: any, args: any) {
            return Information.find({ nodeId: args.nodeId });
        }
    },
    informationRandom: {
        type: InformationType,
        resolve(_parent: any, args: any) {
            // Get a random entry
            var random = Math.floor(Math.random() * 100);

            // Again query all users but only fetch one offset by our random #
            return Information.findOne().skip(random).exec();
        }
    }
};

export const InformationMutations = {
    addInformation: {
        type: InformationType,
        args: { // dont have id in here, doesnt work from axios.
            data: { type: new GraphQLNonNull(GraphQLString) },
            type: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            const information = new Information(args);
            return information.save();
        }
    },
    updateInformation: {
        type: InformationType,
        args: {
            id: { type: GraphQLString },
            data: { type: new GraphQLNonNull(GraphQLString) },
            type: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            return Information.findByIdAndUpdate(args.id, args);
        }
    },
    deleteInformation: {
        type: InformationType,
        args: { id: { type: GraphQLString } },
        resolve(parent: any, args: any) {
            return Information.findByIdAndRemove(args.id);
        }
    },
    addInformationNode: {
        type: InformationType,
        args: {
            data: { type: new GraphQLNonNull(GraphQLString) },
            type: { type: new GraphQLNonNull(GraphQLString) },
            nodeId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            const information = new Information(args);
            return information.save();
        }
    },
}