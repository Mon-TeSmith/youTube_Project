const mongoose =require("mongoose");
const Joi = require('joi');
const {replySchema} = require('./ytschema')
const {commentSchema} = require('./ytschema')

const userSchema = new mongoose.Schema({
    comments: {type: [commentSchema], default:[]},
    
});
const User = mongoose.model('User', userSchema);

exports.User = User;