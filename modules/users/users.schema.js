const mongoose = require('mongoose');
const {
    Types
} = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    brand: {
        type: Types.ObjectId,
        default: null
    }
}, {
    timestamps: true
})

module.exports = UserSchema;