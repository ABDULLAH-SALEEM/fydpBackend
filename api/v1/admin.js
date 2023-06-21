const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const getJwtToken = (data, expiresIn = "120d") =>
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
const { _excludeExtraFields } = require("#helper/utils");
const { manageError } = require("#helper/response.helper");
const {
    findAdmin,
} = require("#services/admin.service");
router.post("/login", login);


async function login(req, res, next) {
    // Validate request body
    if (!req.body.email || !req.body.password) {
        return res.generateResponse(400, "Missing required fields");
    }
    console.log(req.body.email ,req.body.password)
    try {
        const admin = await findAdmin({ email: req.body.email });
        if (!admin) {
            return res.generateResponse(400, "Invalid email or password");
        }
        // Validate password
        if (!admin.authenticatePassword(req.body.password)) {
            return res.generateResponse(400, "Invalid email or password");
        }
        const token = getJwtToken({ admin: { _id: admin._id, email: admin.email } });
        res.generateResponse(200, "Admin Login Successfully", {
            token,
            admin: _excludeExtraFields(admin.toJSON(), [
                "password",
                "updatedAt",
                "createdAt"
            ])
        });

    } catch (err) {
        const error = manageError(err);
        res.generateResponse(error.code, error.message);
    }
}

module.exports = router;