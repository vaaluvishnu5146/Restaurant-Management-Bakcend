const mongoose = require('mongoose');
const BrandSchema = require('./brand.schema');

const BrandModel = mongoose.model("brand", BrandSchema);
module.exports = BrandModel;