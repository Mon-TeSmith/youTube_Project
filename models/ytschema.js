const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
    {
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
    }
)

const commentSchema = new mongoose.Schema(
    {
        videoId: {type: String, required: true},
        text: { type: String, required: true},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        replies: {type: [replySchema], default: []}
    }
)

const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports.Reply = Reply;
module.exports.Comment = Comment;