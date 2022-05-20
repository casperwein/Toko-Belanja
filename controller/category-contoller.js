const Category = require("../models/index").category;

const getAll = async(req, res) => {
    await Category.findAll().then(categories => {
        res.status(200).json({
            categories: categories
        })
    }).catch(error => {
        console.log(error);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error
        });
    });
}

const postCategories = async(req, res) => {
    const type = req.body.type;
    const id = req.id;
    await Category.create({ type, id }).then(categories => {
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
        console.log(error);
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error
        });
    });
}

const updateCategories = async(req, res) => {
    const categoryId = req.params.categoryId;
    const type = req.body.type;
    await Category.update({ where: { id: categoryId } })
}

const deleteCategories = async(req, res) => {
    const categoryId = req.params.categoryId;
    await Category.destroy({ where: { id: categoryId } }).then(() => {
        res.status(200).json({
            message: "Category has been succesfully deleted"
        });
    }).catch(error => {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error
        });
    });
}


module.exports = {
    postCategories,
    getAll,
    deleteCategories,
    updateCategories
}