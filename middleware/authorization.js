const { user: User, category: Category } = require("../models/index");

const userAuthorization = async(req, res, next) => {
    const user_id = req.id;
    const userId = req.params.userId;
    await User.findOne({ where: { id: userId } }).then((user) => {
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
        };
    }).catch((error) => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error
        });
    });
};

const adminAuthorization = (req, res, next) => {
    const role = req.role;
    if (role != "admin") {
        return res.status(400).json({
            message: "only admin can acces categories",
        });
    } else {
        next();
    };
};

const findIdCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findOne({ where: { id: categoryId } }).then(result => {
        if (!result) {
            res.status(400).json({
                message: "ID not found"
            });
        } else {
            next();
        };
    });
};

module.exports = {
    userAuthorization,
    adminAuthorization,
    findIdCategory,
};