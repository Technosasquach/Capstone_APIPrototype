import * as mongoose from "mongoose";

/**
 * ICommentModel
 *
 * @export
 * @interface ICommentModel
 * @extends {mongoose.Document}
 */
export interface ICommentModel extends mongoose.Document {
  nodeId: mongoose.Schema.Types.ObjectId;
  // user: mongoose.Schema.Types.ObjectId;
  contents: string;
  createdAt: Date;
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
*/

// /**
//  * ICommentModel
//  *
//  * @export
//  * @interface ICommentModel
//  * @extends {CommentModel}
//  */
// export interface ICommentModel extends CommentModel {
//   createdAt: Date;
// }

export const CommentSchema: mongoose.Schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now
  },
  infoNodeId: {
      type: String,
      unique: false,
      required: true
  },
  contents: {
      type: String,
      unique: false,
      required: true
  }
  // userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users'
  // }
});


export const Comment: mongoose.Model<ICommentModel> = mongoose.model<ICommentModel>("Comment", CommentSchema);
