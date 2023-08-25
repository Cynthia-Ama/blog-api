const express = require("express")
const app = express()
require("dotenv").config()
const connectdb = require('./connect')
const cookieparser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const dotenv = require("dotenv")
dotenv.config()

const AuthRoutes = require('./routes/Auth')
const PostRoutes = require('./routes/Post')

app.use(express.json())
app.use(cookieparser())


app.use(cors())

app.get("/", (req,res)=>{
    res.send("Hello World")
})
app.use("/api/auth", AuthRoutes)
app.use("/api/posts", PostRoutes)


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "../client/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})

app.post("/api/upload", upload.single("file"), function (req, res, err, next){
    if (err){
       console.log(err)
    }
    const file = req.file
    res.status(200).json(file.filename)
    next()
})

const port = process.env.PORT || 4000
const start = async() =>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port, console.log("server is listening on port 8000"))
    }
    catch (error) {
        console.log(error)
    }
}

start()

