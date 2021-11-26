const Joi = require('joi');
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

function validationOfComments(Comment){
    const schema = Joi.object({
        videoId: Joi.string().min(2).max(500).required(),
        text: Joi.string().required(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
        
    })
        return schema.validation(comment);        
}

function validationOfReply(reply){
    const schema = Joi.object({
        text: Joi.string().required(),
        likes: Joi.number().required(),
        dislikes: Joi.number().required(),
    })
        return schema.validation(reply);        
}

exports.validateReply = validationOfReply;
exports.validatecomments =  validationOfComments;
exports.replySchema = replySchema;
exports.commentsSchema = commentsSchema;
exports.Reply = Reply;
exports.Comment = Comment;