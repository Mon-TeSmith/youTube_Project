const mongoose =require("mongoose");
const Joi = require('joi');
const {replySchema} = require('./ytschema')
const {commentSchema} = require('./ytschema')

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

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        })
         await product.save();
         return res.send(product);
    }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`);
    }
});

router.put("/:id", async (req, res) =>{
    try{
        const{error} = validate(req.body);
        if(error)return res.status(400).send(error);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
            },
            {new: true}
        );
    if(!product)
        return res.status(400).send(`The product with id"${req.params.id}"does not exist.`);
    
        await product.save();
        return res.send(product);
        }catch (ex){
        return res.status(500).send(`Internal Server Error:${ex}`)
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const product = await Product.findByIdAndRemove(req.params.id);

        if(!product)
            return res.status(400).send(`The product with id" ${req.params.id}"does not exist.`);
        return res.send(product);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
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
        if(!comments)
            return res.status(400).send(`The product with id"${req.params.id}"does not exist`);

            await comment.save();
            return res.send(product);
        }catch (ex){
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
});
