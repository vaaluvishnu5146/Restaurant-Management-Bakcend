const mongoose = require('mongoose');
const {
    Types
} = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: Types.ObjectId,
        required: true
    },
    products: {
        type: Array,
        required: true,
    },
    orderValue: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        default: 'placed'
    },
}, {
    timestamps: true
})

module.exports = OrderSchema;