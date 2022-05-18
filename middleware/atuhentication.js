const jwt = require("jsonwebtoken");
const secretKey = "secret";

const verify = (req, res, next) => {
    const token = req.headers["authentication"];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                msg: err,
            });
        }
        req.id = decoded.id;
        next();
    });
};

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        algorithm: "HS256",
        expiresIn: "1H",
    });
    return token;
};

module.exports = {
    verify,
    generateToken,
};