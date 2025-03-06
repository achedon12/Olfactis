const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' });
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = verifyToken;