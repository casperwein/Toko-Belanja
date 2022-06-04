const { category: Category, product: Product } = require("../models/index")

const findIdCategory = (req, res, next) => {
    const categoryId = req.params.categoryId
    Category.findOne({ where: { id: categoryId } }).then(result => {
        if (!result) {
            res.status(400).json({ message: `Category with id ${categoryId}  doesn't exist` });
        } else {
            next();
        };
    });
};

const findIdProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findOne({ where: { id: productId } }).then(result => {
        if (!result) {
            res.status(400).json({ message: `Product with id ${productId}  doesn't exist` });
        } else {
            next();
        };
    })
}

const findIdProductTransaction = (req, res, next) => {
    const productId = req.body.productId;
    Product.findOne({ where: { id: productId } }).then(result => {
        if (!result) {
            res.status(400).json({ message: `Product with id ${productId}  doesn't exist` });
        } else {
            next();
        };
    })
}

module.exports = {
    findIdCategory,
    findIdProduct,
    findIdProductTransaction
}