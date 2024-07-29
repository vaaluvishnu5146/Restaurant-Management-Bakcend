const OrderRouter = require("express").Router();
const {
    Types
} = require("mongoose");
const OrderModel = require('./order.model');

// 1. Create a Order
// http://localhost:3000/orders/create/
OrderRouter.post('/create', async (req, res) => {
    try {
        const Order = new OrderModel(req.body);
        await OrderModel.create(Order);
        return res.status(201).json({
            message: "Order created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating Order",
            error
        })
    }
})

// 2. Get all orders
// http://localhost:3000/orders/
OrderRouter.get('/', async (req, res) => {
    try {
        const response = await OrderModel.find();
        if (response.length > 0) {
            return res.status(200).json({
                message: "Orders fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No Orders found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error creating Order",
            error
        })
    }
})

// 3. Get a Order
// http://localhost:3000/orders/order/:orderId
OrderRouter.get('/order/:orderId', async (req, res) => {
    try {
        const {
            orderId
        } = req.params;
        const response = await OrderModel.findOne({
            _id: new Types.ObjectId(orderId)
        });
        if (response) {
            return res.status(200).json({
                message: "Order fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No Order found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching Order",
            error
        })
    }
})

module.exports = OrderRouter;