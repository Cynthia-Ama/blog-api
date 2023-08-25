const express = require("express")
const {getAllPosts, getPost, createPost, deletePost, updatePost} = require("../controllers/Post")

const router = express.Router()

router.get("/", getAllPosts)
router.get("/:id", getPost)
router.post("/", createPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

module.exports = router 