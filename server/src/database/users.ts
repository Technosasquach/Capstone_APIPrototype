import * as mongoose from "mongoose";

/**
 * EUserAuthLevel
 * 
 * Enumerator is built to contain the 3 levels of access that a user can have:
 * USER = A normal user,
 * OPERATOR = Someone who can edit courses and content on demand, may be removed in the future
 * ADMIN = Can do all of the above, but also can see other users
 * 
 * @export
 * @enum {number}
 */
export enum EUserAuthLevel {
    USER = "USER",
    OPERATOR = "OPERATOR",
    ADMIN = "ADMIN"
}

/**
 * IUserModel
 *
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends mongoose.Document {
    createdAt: Date;
    username: string;
    password: string;
    accessLevel: EUserAuthLevel
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    accessLevel: {
        type: String
    }
});

export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", UserSchema);