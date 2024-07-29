const mongoose = require('mongoose');
const OrderSchema = require('./order.schema');


const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;