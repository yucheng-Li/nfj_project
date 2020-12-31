const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    console.log(req.headers)
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        console.log(token)

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
