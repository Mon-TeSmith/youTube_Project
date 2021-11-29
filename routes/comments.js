const { Reply, Comment, validateReply, validateComments } = require('../models/ytschema')
const express = require("express");
const router = express.Router();

router.get("/:videoId",async (req,res) =>{
    try{
        const comments = await Comment.find({videoId: req.params.videoId});

        if (!comments)
            return res.status(400).send(`There are no comments with video id ${req.params.videoId}.`);

        return res.send(comments);

    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('', async (req,res) => {
    try{
        const {error} = validateComments(req.body);

        if (error){
            return res.status(400).send(error);
        }
        

        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text,
        });
        
         await comment.save();
         return res.send(comment);
    }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});
router.put("/:commentId", async (req, res) => {
    try{

        const comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                ...req.body
            },
            {new: true}
        );
        if(!comment)
            return res.status(400).send(`The comment with id ${req.params.commentId} does not exist`);

        await comment.save();
        return res.send(comment);
        }catch (ex){
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
});

router.post('/:commentId/replies', async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(400).send(`The comment with id ${req.params.commentId} does not exist.`);


        const reply = new Reply({
            commentId: req.body.commentId,
            text: req.body.text,
        });

        comment.replies.push(comment);
        // 
         await comment.save();
         return res.send(reply);
    }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const comment = await Comment.findByIdAndRemove(req.params.id);

        if(!comment)
            return res.status(400).send(`The comment with id" ${req.params.id}"does not exist.`);
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



module.exports = router;
