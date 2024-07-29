const mongoose = require('mongoose');
const {
    Types
} = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        required: false,
    },
    brand: {
        type: Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = ProductSchema;