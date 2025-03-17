const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.redirect('/description');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: err });

        req.user = user;
        next();
    });
}

module.exports = authenticate;