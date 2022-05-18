const User = require("../models/index").user

const userAuthorization = async(req, res, next) => {
    const user_id = req.id
    const userId = req.params.userId;
    User.findOne({ where: { id: userId } }).then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user.id === user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
                });
            }
        })
        .catch((e) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: e
            });
        });
}

module.exports = {
    userAuthorization
}