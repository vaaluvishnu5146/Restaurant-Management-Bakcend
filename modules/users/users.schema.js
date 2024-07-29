const mongoose = require('mongoose');

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
    }
}, {
    timestamps: true
})

module.exports = UserSchema;