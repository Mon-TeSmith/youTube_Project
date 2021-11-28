const mongoose =require("mongoose");
const Joi = require('joi');
const {replySchema} = require('./ytschema')
const {commentSchema} = require('./ytschema')
const router = express.Router();

router.get("/:id",async (req,res) =>{
    try{
        const comment = await Comment.findById(req.params.id);

        if (!comment)
            return res.status(400).send(`The product with id"${req.params.id}"does not exist`);
            return res.send(comment);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/",async (req,res) => {
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

router.put("/:id", async (req, res) =>{
    try{
        const{error} = validate(req.body);
        if(error)return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.comment.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
            },
            {new: true}
        );
    if(!comment)
        return res.status(400).send(`The comment with id"${req.params.id}"does not exist.`);
    
        await comment.save();
        return res.send(comment);
        }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`)
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

// router.put("/:id", async (req, res) => {
//     try{
//         const {error} = validate(req.body);
//         if (error) return res.status(400).send(error);

//         const comment = await Comment.findByIdAndUpdate(
//             req.params.id,
//             {
//                 videoId:req.body.videoId,
//                 text: req.body.text,
//                 likes: req.body.likes,
//                 dislikes: req.body.dislikes,
//                 replies: req.body.replies,
//             },
//             {new: true}
//         );
//         if(!comment)
//             return res.status(400).send(`The comment with id"${req.params.id}"does not exist`);

//             await comment.save();
//             return res.send(comment);
//         }catch (ex){
//             return res.status(500).send(`Internal Server Error: ${ex}`);
//         }
// });

module.exports = router;
