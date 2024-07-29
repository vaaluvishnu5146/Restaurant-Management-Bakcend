const BrandRouter = require('express').Router();
const Brand = require('./brand.model');
const {
    Types
} = require('mongoose');

// 1. Create auth
// http://localhost:3000/brands/create/
BrandRouter.post('/create', async (req, res) => {
    try {
        const newbrand = new Brand(req.body);
        await Brand.create(newbrand);
        return res.status(201).json({
            message: "Brand created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating brand",
            error
        })
    }
})

// 2. Get all brands
// http://localhost:3000/brands/
BrandRouter.get('/', async (req, res) => {
    try {
        const response = await Brand.find();
        if (response.length > 0) {
            return res.status(200).json({
                message: "Brands fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No Brands found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error creating brand",
            error
        })
    }
})

// 3. Get a brand
// http://localhost:3000/brands/:brandId
BrandRouter.get('/brand/:brandId', async (req, res) => {
    try {
        const {
            brandId
        } = req.params;
        const response = await Brand.findOne({
            _id: new Types.ObjectId(brandId)
        });
        if (response) {
            return res.status(200).json({
                message: "Brand fetched successfully",
                response
            })
        } else {
            return res.status(200).json({
                message: "No Brand found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching brand",
            error
        })
    }
})

// 3. Update a brands
// http://localhost:3000/brands/:brandId
BrandRouter.patch('/:brandId', async (req, res) => {
    const {
        brandId
    } = req.params;
    try {
        const response = await Brand.findOneAndUpdate({
            _id: new Types.ObjectId(brandId)
        }, {
            $set: req.body
        }, {
            new: true,
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating brand!",
            })
        }
        if (response) {
            return res.status(200).json({
                message: "Brand updated successfully",
                response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error updating brand",
            error
        })
    }
})

// 3. Update a brands
// http://localhost:3000/brands/:brandId
BrandRouter.delete('/:brandId', async (req, res) => {
    const {
        brandId
    } = req.params;
    try {
        const response = await Brand.findOneAndDelete({
            _id: new Types.ObjectId(brandId)
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting brand!",
            })
        }
        if (response) {
            return res.status(200).json({
                message: "Brand deleted successfully",
                response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error Deleting brand",
            error
        })
    }
})

module.exports = BrandRouter;