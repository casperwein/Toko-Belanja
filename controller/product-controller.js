const { product: Product, category: Category } = require("../models/index");

const getProducts = async(req, res) => {
    await Product.findAll()
        .then((result) => {
            res.status(200).json({ products: result });
        })
        .catch((error) => {
            res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
        });
};

const postProducts = async(req, res) => {
    const { title, price, stock, CategoryId } = req.body;
    await Category.findOne({ where: { id: CategoryId } })
        .then((category) => {
            if (!category) {
                return res
                    .status(400)
                    .json({ msg: `Category with id ${CategoryId} not found` });
            }
            Product.create({ title, price, stock, CategoryId })
                .then((product) => {
                    res.status(201).json({
                        product: {
                            id: product.id,
                            title: product.title,
                            price: `Rp. ${product.price}`,
                            stock: product.stock,
                            CategoryId: product.CategoryId,
                            updatedAt: product.updatedAt,
                            createdAt: product.createdAt,
                        },
                    });
                })
                .catch((error) => {
                    res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
                });
        })
        .catch((error) => {
            res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
        });
};

const updateProducts = async(req, res) => {
    const productId = req.params.productId;
    const data = ({ price, stock, title } = req.body);
    await Product.update(data, { where: { id: productId }, returning: true })
        .then((result) => {
            res.status(200).json({
                product: {
                    id: result[1][0].id,
                    title: result[1][0].title,
                    price: `Rp. ${result[1][0].price}`,
                    stock: result[1][0].stock,
                    CategoryId: result[1][0].CategoryId,
                    createdAt: result[1][0].createdAt,
                    updatedAt: result[1][0].updatedAt,
                },
            });
        })
        .catch((error) => {
            res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
        });
};

const updateCategoryId = async(req, res) => {
    const productId = req.params.productId;
    const CategoryId = req.body.CategoryId;

    await Category.findOne({ where: { id: CategoryId } })
        .then((result) => {
            if (!result) {
                return res
                    .status(400)
                    .json({ message: `Category with id ${CategoryId}  doesn't exist` });
            }
            Product.update({ CategoryId }, { where: { id: productId }, returning: true })
                .then((result) => {
                    res.status(200).json({
                        product: {
                            id: result[1][0].id,
                            title: result[1][0].title,
                            price: `Rp. ${result[1][0].price}`,
                            stock: result[1][0].stock,
                            CategoryId: result[1][0].CategoryId,
                            createdAt: result[1][0].createdAt,
                            updatedAt: result[1][0].updatedAt,
                        },
                    });
                })
                .catch((error) => {
                    res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
                });
        })
        .catch((error) => {
            res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
        });
};

const deleteProducts = async(req, res) => {
    const productId = req.params.productId;
    await Product.destroy({ where: { id: productId } })
        .then(() => {
            res.status(200).json({ msg: "Product has been succesfully deleted" });
        })
        .catch((error) => {
            res.status(500).json({ msg: "INTERNAL SERVER ERROR", error });
        });
};

module.exports = {
    postProducts,
    getProducts,
    updateProducts,
    deleteProducts,
    updateCategoryId,
};