import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Information } from '../database/information.js';

export const InformationType = new GraphQLObjectType({
    name: 'Information',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        related: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        text: { type: new GraphQLNonNull(GraphQLString) }
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
        args: { id: { type: GraphQLString }},
        resolve(parent: any, args: any) {
            return Information.findById(args.id);
        }
    }
};

export const InformationMutations = {
    addInformation: {
        type: InformationType,
        args: {
            id: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            related: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
            text: { type: new GraphQLNonNull(GraphQLString) }
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
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            related: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
            text: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent: any, args: any) {
            return Information.findByIdAndUpdate(args.id, args);
        }
    },
    deleteInformation: {
        type: InformationType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Information.findByIdAndRemove(args.id);
        }
    }
}