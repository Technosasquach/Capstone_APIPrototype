import * as mongoose from "mongoose";

/**
 * UserModel
 *
 * @export
 * @interface UserModel
 * @extends {mongoose.Document}
 */
export interface UserModel extends mongoose.Document {
    name: string;
    date: Date;
}


export const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Comment: mongoose.Model<UserModel> = mongoose.model<UserModel>("Users", UserSchema);