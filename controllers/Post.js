const jwt = require("jsonwebtoken")
require('dotenv').config()
const Post = require("../models/Posts")

async function getAllPosts(req, res){
    const catName = req.query.cat

    try {
        let posts;

        if(catName){
            posts = await Post.find({cat: {
                $in: [catName]
            }})
        }

        else{
            posts = await Post.find()
        }

        return res.status(200).json(posts)
    } 
    catch (error) {
        res.status(500).json(error)
    }
}

async function getPost(req, res){
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function createPost(req, res){
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
      
    } 
    catch (error) {
        console.log(error)
    }
}

async function deletePost(req, res){
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json("No token provided")

    const token = authHeader.split(' ')[1]

    const confirmToken = jwt.verify(token, process.env.JWTKEY)

    if(!confirmToken) return res.status(500).json("You can only delete your own post!")

    try {
        const post = await Post.findById(req.params.id)
        // post exists
            try {
                await Post.deleteOne(post)
                res.status(200).json("Post has been deleted")
            } 
            catch (error) {
                console.log(error) 
            }
    } 
    catch (error) {
        // post does not exist
        res.status(404).json(error)
    }

}

async function updatePost(req, res){
  
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json("No token provided")

    const token = authHeader.split(' ')[1]

    const confirmToken = jwt.verify(token, process.env.JWTKEY)
    if(!confirmToken) return res.status(500).json("You can only update your own post!")

        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true 
                }
            )
            res.status(200).json({updatedPost})
            } 
        catch (error) {
            res.status(500).json(error)
        }
}

module.exports = {getAllPosts, getPost, createPost, deletePost, updatePost}