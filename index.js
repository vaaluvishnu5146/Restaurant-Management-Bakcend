const express = require('express');
const parser = require('body-parser');
const {
    initialize_mongo_connectivity
} = require('./database/connection');
require('dotenv').config();

const server = express();

const config = {
    port: 3000,
    host: 'localhost'
};

server.use(parser.json());
server.use('/brands', require('./modules/Brands/brand.controller'));
server.use('/products', require('./modules/Products/product.controller'));
server.use('/orders', require('./modules/Orders/order.controller'));

server.listen(config.port, config.host, () => {
    initialize_mongo_connectivity();
    console.log(`Server started successfully http://${config.host}:${config.port} `)
});