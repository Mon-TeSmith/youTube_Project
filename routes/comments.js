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

router.post("/:videoId",async (req,res) => {
    try{
        const {error} = validate(req.body);
        if (error)
        return res.status(400).send(error);

        const comment = new Comment({
            videoId:req.body.videoId,
                text: req.body.text,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                replies: req.body.replies,
        })
         await comment.save();
         return res.send(comment);
    }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});
router.put("/:id", async (req, res) => {
    try{
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                videoId:req.body.videoId,
                text: req.body.text,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                replies: req.body.replies,
            },
            {new: true}
        );
        if(!comment)
            return res.status(400).send(`The comment with id"${req.params.id}"does not exist`);

            await comment.save();
            return res.send(comment);
        }catch (ex){
            return res.status(500).send(`Internal Server Error: ${ex}`);
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
