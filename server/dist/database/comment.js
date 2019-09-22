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
exports.CommentSchema = new mongoose.Schema({
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
exports.Comment = mongoose.model("Comment", exports.CommentSchema);
//# sourceMappingURL=comment.js.map