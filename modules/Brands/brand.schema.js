const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        areaCode: {
            type: Number,
            required: true
        }
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    cuisine: {
        type: String,
        required: true
    },
    isTrending: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = BrandSchema;