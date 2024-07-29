const mongoose = require('mongoose');
const ProductSchema = require('./product.schema');

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;