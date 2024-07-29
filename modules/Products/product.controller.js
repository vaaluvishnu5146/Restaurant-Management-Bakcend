const ProductRouter = require('express').Router();
const product = require('./product.model');
const {
    Types
} = require('mongoose');

// 1. Create a Product
// http://localhost:3000/products/create/
ProductRouter.post('/create', async (req, res) => {
    try {
        const newProduct = new product(req.body);
        await product.create(newProduct);
        return res.status(201).json({
            message: "product created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating product",
            error
        })
    }
})

// 2. Get all products
// http://localhost:3000/products/
ProductRouter.get('/', async (req, res) => {
    try {
        const response = await product.find();
        if (response.length > 0) {
            return res.status(200).json({
                message: "products fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No products found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error creating product",
            error
        })
    }
})

// 3. Get a product
// http://localhost:3000/products/:productId
ProductRouter.get('/product/:productId', async (req, res) => {
    try {
        const {
            productId
        } = req.params;
        const response = await product.findOne({
            _id: new Types.ObjectId(productId)
        });
        if (response) {
            return res.status(200).json({
                message: "product fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No product found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching product",
            error
        })
    }
})

// 3. Get a products of particular restaurant
// http://localhost:3000/products/:brandId
ProductRouter.get('/products/:brandId/', async (req, res) => {
    try {
        const {
            brandId
        } = req.params;
        const response = await product.find({
            brandId,
        });
        if (response) {
            return res.status(200).json({
                message: "Products fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No product found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching product",
            error
        })
    }
})

// 3. Update a products
// http://localhost:3000/products/:productId
ProductRouter.patch('/:productId', async (req, res) => {
    const {
        productId
    } = req.params;
    try {
        const response = await product.findOneAndUpdate({
            _id: new Types.ObjectId(productId)
        }, {
            $set: req.body
        }, {
            new: true,
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating product!",
            })
        }
        if (response) {
            return res.status(200).json({
                message: "product updated successfully",
                response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error updating product",
            error
        })
    }
})

// 3. Update a products
// http://localhost:3000/products/:productId
ProductRouter.delete('/:productId', async (req, res) => {
    const {
        productId
    } = req.params;
    try {
        const response = await product.findOneAndDelete({
            _id: new Types.ObjectId(productId)
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting product!",
            })
        }
        if (response) {
            return res.status(200).json({
                message: "product deleted successfully",
                response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error Deleting product",
            error
        })
    }
})

module.exports = ProductRouter;