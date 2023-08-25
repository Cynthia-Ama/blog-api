const blogPosts = require('./blogPosts.json')
const postsModel = require('./models/Posts')
const connectdb = require('./connect')
require("dotenv").config()


const start = async() =>{
    try {
        await connectdb(process.env.MONGO_URI)
        await postsModel.deleteMany()
        await postsModel.create(blogPosts)
        process.exit(0)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()