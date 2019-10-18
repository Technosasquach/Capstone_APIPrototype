import { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from 'graphql';
import { User, Account, Course, Node } from '../database/index';
import { AccountType } from './accountSchema';
import { AuthenticationController } from '../controllers/authentication';
import { CourseType } from './courseSchema';
import { NodeType } from './nodeSchema';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        createdAt: { type: (GraphQLString) },
        username: { type: (GraphQLString) },
        coursesTaken: { type: new GraphQLList(GraphQLString) },
        currentCourses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args) {
                return parent.coursesTaken.map((id: string) => {
                    return Course.findById(id);
                });
            }
        },
        coursesComplete: { type: new GraphQLList(GraphQLString) },
        history: { type: new GraphQLList(GraphQLString) },
        accessLevel: { type: (GraphQLString) },
        account: {
            type: AccountType,
            resolve(parent, args) {
                return Account.findOne({ username: parent.username });
            }
        }
    })
});



export const UserQueries = {
    everyUser: {
        type: new GraphQLList(UserType),
        resolve() {
            return User.find({});
        }
    },
    userByName: {
        type: UserType,
        args: { username: { type: GraphQLString } },
        resolve(parent: any, args: any) {
            return User.findOne({ username: args.username }); //FindOne doesnt work
        }
    }
};

export const UserMutations = {

    addLearnedNode: {
        type: UserType,
        args: {
            nodeId: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent: any, args: any, context: any) {
            const token = context.req.signedCookies["jwt"];
            const auth = AuthenticationController.authenticateJWT(token);
            if (auth.valid) {
                if (auth.userID.length != (null || undefined)) {
                    return User.findByIdAndUpdate(auth.userID, { $addToSet: { history: args.nodeId } }, { new: true });
                }
            }
            throw new Error();
        }
    },

    //     addUser: {
    //         type: UserType,
    //         args: {
    //             username: { type: new GraphQLNonNull(GraphQLString) },
    //             password: { type: new GraphQLNonNull(GraphQLString) },
    //             accessLevel: { type: new GraphQLNonNull(GraphQLString) }
    //         },
    //         resolve(parent: any, args: any) {
    //             const user = new User(args);
    //             return user.save();
    //         }
    //     },

    // updateUser: {
    //     type: UserType,
    //     args: {
    //         id: { type: GraphQLString },
    //         createdAt: { type: new GraphQLNonNull(GraphQLString) },
    //         username: { type: new GraphQLNonNull(GraphQLString) },
    //         password: { type: new GraphQLNonNull(GraphQLString) },
    //         accessLevel: { type: new GraphQLNonNull(GraphQLString) }
    //     },
    //     resolve(parent: any, args: any) {
    //         return User.findByIdAndUpdate(args.id, args);
    //     }
    // },

    //     deleteComment: {
    //         type: UserType,
    //         args: { id: { type: GraphQLString}},
    //         resolve(parent: any, args: any) {
    //             return User.findByIdAndRemove(args.id);
    //         }
    //     }
}