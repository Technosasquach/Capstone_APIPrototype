"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.CommentSchema = new mongoose.Schema({
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
exports.Comment = mongoose.model("Comments", exports.CommentSchema);
// export const Comment: mongoose.Model<ICommentModel> = mongoose.model<ICommentModel>("Comments", CommentSchema);
//# sourceMappingURL=comment.js.map