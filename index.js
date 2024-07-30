const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const {
    initialize_mongo_connectivity
} = require('./database/connection');
require('dotenv').config();

const server = express();

// Enabling cors
server.use(cors());

const config = {
    port: 3000,
    host: 'localhost'
};

server.use(parser.json());
server.use('/brands', require('./modules/Brands/brand.controller'));
server.use('/products', require('./modules/Products/product.controller'));
server.use('/orders', require('./modules/Orders/order.controller'));
server.use('/api/auth', require('./modules/authentication/authentication.controller.js'));
server.use('/api/auth/admin', require('./modules/authentication/authentication.dashboard.controller.js'));
server.use('/api/users/', require('./modules/users/users.controller.js'));

server.listen(config.port, config.host, () => {
    initialize_mongo_connectivity();
    console.log(`Server started successfully http://${config.host}:${config.port} `)
});