const jwt = require('jsonwebtoken');
const UserModel = require('../modules/users/users.model');
const {
    Types
} = require('mongoose');

function TokenChecker(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = jwt.verify(req.headers.authorization, "FILE_SYSTEM_SECRET_KEY");
            if (token) {
                next();
            }
        } else {
            return res.status(500).json({
                message: "Token is missing"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}


async function AdminGuardChecker(req, res, next) {
    try {
        if (req.body.email) {
            const response = await UserModel.findOne({
                email: req.body.email
            });
            if (response._id) {
                if(response.isAdmin || response.isSuperAdmin) {
                    next();
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "Un Authorized access"
                    })
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "No accounts found. Create account to continue"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

module.exports = {
    TokenChecker,
    AdminGuardChecker
};