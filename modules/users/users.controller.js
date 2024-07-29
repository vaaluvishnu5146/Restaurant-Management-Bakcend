const UsersRouter = require('express').Router();
const User = require('./users.model');
const {
    Types
} = require('mongoose');

// 2. Get All Users
//http://localhost:3000/users/
UsersRouter.get('/', async (req, res) => {
    try {
        const response = await User.find(); // [{}, {}] or []
        return res.json({
            message: "Users fetched successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
});

// 3. Get a user
// http://localhost:3000/users/user/1
UsersRouter.get('/user/:userId', async (req, res) => {
    const {
        userId
    } = req.params;
    try {
        const response = await User.findOne({
            _id: new Types.ObjectId(userId)
        }); // null/undefined or {}
        if (response) {
            return res.status(200).json({
                message: "User fetched successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                message: "No User found",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
})

// 4. Update a user
// http://localhost:3000/users/update/1
UsersRouter.patch('/update/:userId', async (req, res) => {
    const {
        userId
    } = req.params;
    try {
        const response = await User.findOneAndUpdate({
            _id: new Types.ObjectId(userId),
        }, {
            $set: req.body
        }, {
            new: true,
            projection: {
                _id: 0
            }
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating user! No User found",
            })
        } else {
            return res.json({
                message: "User updated successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

// 5. Delete a user
// http://localhost:3000/users/delete/1
UsersRouter.delete('/delete/:userId', async (req, res) => {
    const {
        userId
    } = req.params;
    try {
        const response = await User.findOneAndDelete({
            _id: new Types.ObjectId(userId),
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting user! No User found",
            })
        } else {
            return res.json({
                message: "User deleted successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
});



module.exports = UsersRouter;