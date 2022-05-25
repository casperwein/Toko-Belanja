const { user: User, category: Category } = require("../models/index");

const userAuthorization = async(req, res, next) => {
    const user_id = req.id;
    const userId = req.params.userId;
    await User.findOne({ where: { id: userId } }).then((user) => {
        if (!user) {
            res.status(400).json({ message: "id not found" });
        } else if (user.id === user_id) {
            next();
        } else {
            res.status(401).json({
                name: "authorization error",
                devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
            });
        };
    }).catch((error) => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
    });
};

const adminAuthorization = (req, res, next) => {
    const role = req.role;
    if (role != "admin") {
        return res.status(401).json({ message: "only admin can acces categories" });
    } else {
        next()
    };
};

const customerAuthorization = (req, res, next) => {
    const role = req.role;
    if (role != "customer") {
        return res.status(401).json({ message: "only customer can acces customers" });
    } else {
        next()
    };
};

module.exports = {
    userAuthorization,
    adminAuthorization,
    customerAuthorization,
};