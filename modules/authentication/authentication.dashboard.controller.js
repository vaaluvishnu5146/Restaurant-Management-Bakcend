const AdminAuthRouter = require('express').Router();
const User = require('../users/users.model');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AdminGuardChecker } = require('../../middleware/AuthGuard');

// Signin api
// http://localhost:3000/auth/signin
AdminAuthRouter.post('/signin', AdminGuardChecker, async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Bad Credentials",
            message: "Email Id is missing"
        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            error: "Bad Credentials",
            message: "Password is missing"
        })
    }

    // 1. Check whether email matches any record in the database
    //   1. If it matches: 
    //      1. Check whether user entered password === record.password
    //          1. Login and send success message
    //      2. If password doesnt match:
    //         2. invalid username or password
    //   2. If no matches:
    //      1. No account found. Create account to proceed

    try {
        // Querying db to find any records matching given email
        const response = await User.findOne({
            email
        });
        // IF no accounts matching send below response
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "No accounts found. Create account to continue"
            })
        } else {
            // If password is matching then confirm the login session
            bcrypt.compare(password, response.password).then((valid) => {
                if (valid) {
                    var token = jwt.sign({
                        _id: response._id
                    }, "FILE_SYSTEM_SECRET_KEY", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        success: true,
                        message: "Login Successfull",
                        token
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid username or password"
                    })
                }
            }).catch((error) => {
                throw new Error("Error comparing password");
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
});

module.exports = AdminAuthRouter;