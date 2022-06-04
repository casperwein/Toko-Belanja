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

const checkProductBeforeDelete = async(req, res, next) => {
    const categoryId = req.params.categoryId
    await Product.findOne({ where: { CategoryId: categoryId } })
        .then(product => {
            if (product) {
                res.status(400).json({
                    message: "You can't delete a category that contains a product. please delete the product first"
                })
            } else {
                next()
            }
        })
        .catch(error => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error.message
            })
        })
}

module.exports = {
    findIdCategory,
    findIdProduct,
    findIdProductTransaction,
    checkProductBeforeDelete
}