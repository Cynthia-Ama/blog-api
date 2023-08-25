const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        } 
    },
    password:{
        type: String,
        required: true,
    },
},
{ timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)