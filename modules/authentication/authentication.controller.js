const AuthRouter = require('express').Router();
const User = require('../users/users.model');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// 1. Create auth
// http://localhost:3000/auth/create/
AuthRouter.post('/create', (req, res) => {
    const newUser = new User(req.body);
    bcrypt.hash(newUser.password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            console.log(err)
        }
        newUser.password = hash;
        if (hash) {
            try {
                const response = await User.create(newUser);
                return res.status(201).json({
                    message: "User created successfully",
                })
            } catch (error) {
                return res.json({
                    message: "Error creating user",
                    error
                })
            }
        }
    });
})

// Signin api
// http://localhost:3000/auth/signin
AuthRouter.post('/signin', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Bad Credentials",
            message: "Email Id is missing"
        })
    }
    if (!password) {
        return res.status(400).json({
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
                message: "No accounts found. Create account to continue"
            })
        } else {
            // If password is matching then confirm the login session
            bcrypt.compare(password, response.password).then((valid) => {
                if (valid) {
                    var token = jwt.sign({
                        _id: response._id,
                        role: "basic"
                    }, "FILE_SYSTEM_SECRET_KEY", {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Login Successfull",
                        token
                    })
                } else {
                    return res.status(401).json({
                        message: "Invalid username or password"
                    })
                }
            }).catch((error) => {
                throw new Error("Error comparing password");
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
});

// 4. Update user password
// http://localhost:3000/auth/updatePassword/1
AuthRouter.patch('/updatePassword/:userId', async (req, res) => {
    const {
        userId
    } = req.params;
    const {
        password
    } = req.body;
    if (!password) {
        return res.status(400).json({
            error: "Bad Credentials",
            message: "Password is missing"
        })
    }
    try {
        const response = await User.findOneAndUpdate({
            _id: new Types.ObjectId(userId),
        }, {
            $set: {
                password
            }
        }, {
            new: true,
            projection: {
                _id: 0
            }
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating user password! No User found",
            })
        } else {
            return res.json({
                message: "password updated successfully",
                data: {
                    password
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

AuthRouter.post('/initiateForgotPassword', async (req, res) => {
    const {
        email
    } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                error: "Bad Credentials",
                message: "Email Id is missing"
            })
        } else {
            const response = await User.findOne({
                email
            })
            // if null
            if (!response) {
                return res.status(404).json({
                    message: "No user found"
                })
            } else {
                // Initiate OTP
                return res.status(200).json({
                    message: "An email with otp has been sent to your inbox. Kindly check!"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }

});

module.exports = AuthRouter;