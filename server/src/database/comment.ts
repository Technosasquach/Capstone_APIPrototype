import * as mongoose from "mongoose";

/**
 * CommentModel
 *
 * @export
 * @interface CommentModel
 * @extends {mongoose.Document}
 */
export interface CommentModel extends mongoose.Document {
    node: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    contents: string;
    date: Date;
}

/*
    TSCommentModel
    A model for in memory array use and recursive nesting?????????????
    
    @export
    @interface TSCommentModel
    @extends {CommentModel}

    export interface TSCommentModel extends CommentModel {
        uuid: string;
    }

 
    ICommentModel
 
    @export
    @interface ICommentModel
    @extends {CommentModel}

    export interface ICommentModel extends CommentModel {
        createdAt: Date;
    }
*/


export const CommentSchema: mongoose.Schema = new mongoose.Schema({
    nodeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nodes'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    contents: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Comment: mongoose.Model<CommentModel> = mongoose.model<CommentModel>("Comments", CommentSchema);
// export const Comment: mongoose.Model<ICommentModel> = mongoose.model<ICommentModel>("Comments", CommentSchema);