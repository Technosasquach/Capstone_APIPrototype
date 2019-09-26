import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { Course } from '../database/courses'
import { Page } from '../database/pages'
import { Comment } from '../database/comment'

export const PageType = new GraphQLObjectType({
    name: 'Page',
    fields: () => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString},
        content: {type: GraphQLString},
        image: {type: GraphQLString}
    })
})

export const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        name: {type: GraphQLString},
        pages: {
            type: new GraphQLList(PageType),
            resolve(parent, args) {
                return parent.pages.map((id: string) => {
                    return Page.findById(id);
                })
            }
        },
    })
});

export const CourseQueries = {
    everyCourse: {
        type: new GraphQLList(CourseType),
        resolve() {
            return Course.find({});
        }
    },
    course: {
        type: CourseType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Course.findById(args.id);
        }
    },
    everyPage: {
        type: new GraphQLList(PageType),
        resolve() {
            return Page.find({});
        }
    },
    page: {
        type: PageType,
        args: { id: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Page.findById(args.id);
        }
    },
    pageForNodeId: {
        type: PageType,
        args: { NodeId: { type: GraphQLString}},
        resolve(parent: any, args: any) {
            return Page.findOne({"content":{$regex:".*"+args.NodeId+".*"}});
        }
    }
};