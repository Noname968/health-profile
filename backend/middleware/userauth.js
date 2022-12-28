const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        // console.log(token);

        if (!token) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
}

module.exports = auth;