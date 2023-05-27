const mongoose = require("mongoose")
const {Schema} = mongoose;


const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    merchant: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: "member",
        enum: ["admin", "member", "merchant"]
    },
    updated: {
        type: Date
    },
    randomOtp:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now,
    },
    facebookId: {
        type: String
    },
    linkdinId: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);