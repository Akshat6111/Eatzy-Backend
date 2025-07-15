const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    data : {
        type : Date,
        default : Date.now,
    }
})

module.exports = mongoose.model("User",userSchema)