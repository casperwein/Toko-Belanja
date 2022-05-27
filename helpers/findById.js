const { category: Category, product: Product } = require("../models/index");

const findIdCategory = (req, res, next) => {
    const categoryId = req.params.categoryId || req.params.productId;
    Category.findOne({ where: { id: categoryId } }).then((result) => {
        if (!result) {
            res
                .status(400)
                .json({ message: `Category with id ${categoryId}  doesn't exist` });
        } else {
            next();
        }
    });
};

const findIdProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findOne({ where: { id: productId } }).then((result) => {
        if (!result) {
            res
                .status(400)
                .json({ message: `Product with id ${productId}  doesn't exist` });
        } else {
            next();
        }
    });
};

const findIdProductTransaction = (req, res, next) => {
    const productId = req.body.productId;
    Product.findOne({ where: { id: productId } }).then((result) => {
        if (!result) {
            res
                .status(400)
                .json({ message: `Product with id ${productId}  doesn't exist` });
        } else {
            next();
        }
    });
};

const checkStock = (req, res, next) => {
    const quantityBeli = req.body.quantityBeli;
    const productId = req.params.productId;
    Product.findOne({ where: { id: productId } }).then((product) => {
        if (product.price >= quantityBeli) {
            next();
        } else {
            res
                .status(400)
                .json("stoknya nggk banyak, kurangi ekpektasi anda qkqkqkqk");
        }
    });
};

module.exports = {
    findIdCategory,
    checkStock,
    findIdProduct,
    findIdProductTransaction,
};