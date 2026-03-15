const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },
    },

    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product