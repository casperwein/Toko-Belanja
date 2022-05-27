const { category: Category, product: Product } = require("../models/index");

const getAll = async(req, res) => {
    await Category.findAll({
        include: [{
            model: Product,
            as: "Products",
        }]
    }).then(categories => {
        res.status(200).json({ categories: categories })
    }).catch(error => {
        res.status(503).json({ message: "INTERNAL SERVER ERROR", error });
    });
}

const postCategories = async(req, res) => {
    const type = req.body.type;
    await Category.create({ type }).then(categories => {
        res.status(201).json({
            category: {
                id: categories.id,
                type: categories.type,
                sold_product_amont: categories.sold_product_amount,
                updatedAt: categories.updatedAt,
                createdAt: categories.createdAt,
            }
        })
    }).catch(error => {
        res.status(503).json({ message: "INTERNAL SERVER ERROR", error });
    });
}

const updateCategories = async(req, res) => {
    const categoryId = req.params.categoryId;
    const type = req.body.type;
    await Category.update({ type }, { where: { id: categoryId }, returning: true })
        .then(category => { res.status(200).json({ category: category[1][0] }) })
        .catch(error => {
            res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
        });
}

const deleteCategories = async(req, res) => {
    const categoryId = req.params.categoryId;
    await Category.destroy({ where: { id: categoryId } }).then(() => {
        res.status(200).json({ message: "Category has been succesfully deleted" });
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
    });
}


module.exports = {
    postCategories,
    getAll,
    deleteCategories,
    updateCategories,
}