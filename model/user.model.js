const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    browserId: {
        type: String,
        required: true,
        unique: true
    },

    alias: {
        type: String,
        required: true
    },

    ip: {
        type: String
    },

    userAgent: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)