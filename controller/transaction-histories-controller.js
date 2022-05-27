const { transactionhistory: TransactionHostory, product: Product, user: User, category: Category } = require("../models/index")

const postTransaction = async(req, res) => {
    const ProductId = req.body.productId
    const quantity = req.body.quantity
    const UserId = req.id;

    await Product.findOne({ where: { id: ProductId } }).then(product => {
        const total_price = product.price * quantity
        const stockada = product.price >= quantity
        if (!stockada) {
            return res.status(400).json(`You can order less than or equal to ${product.stock} products`)
        }
        User.findOne({ where: { id: UserId } }).then(user => {
            const saldopas = user.balance >= total_price
            if (!saldopas) {
                res.status(400).json("Saldo tidak Cukup");
            }
            TransactionHostory.create({ ProductId, UserId, total_price, quantity, })
                .then(() => {
                    const CategoryId = product.CategoryId
                    product.stock = product.stock - quantity
                    user.balance = user.balance - total_price
                    product.save()
                    user.save()
                    Category.findOne({ where: { id: CategoryId } }).then((category) => {
                        category.sold_product_amount = category.sold_product_amount + quantity
                        category.save()
                    }).catch()
                    res.status(201).json({
                        message: "You hace succesfully purchase the product",
                        transactionBil: { total_price: `Rp. ${total_price}`, quantity, product_name: product.title }
                    })
                }).catch(error => {
                    res.status(503).json({ message: "INTERNAL SERVER ERROR", error })
                });
        }).catch(error => {
            res.status(503).json({ message: "INTERNAL SERVER ERROR", error })
        });
    }).catch(error => {
        res.status(503).json({ message: "INTERNAL SERVER ERROR", error })
    });
}

const getAllByUser = async(req, res) => {
    const UserId = req.id
    await TransactionHostory.findAll({
        where: { UserId },
        include: [{
            model: Product,
            as: "Products",
            attributes: ["id", "title", "price", "stock", "CategoryId"],
        }, ],
    }).then(transaction => {
        res.status(200).json({ transaction })
    }).catch(error => {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
    });
}

const getTransactionById = async(req, res) => {
    const transactionId = req.params.transactionId
    await TransactionHostory.findOne({
        where: { id: transactionId },
        include: {
            model: Product,
            as: "Products",
            attributes: ["id", "title", "price", "stock", "CategoryId"],
        },
    }).then(transaction => {
        res.status(200).json({
            transaction
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
    });
}

const getAllByAdmin = async(req, res) => {
    await TransactionHostory.findAll({
        include: [{
                model: Product,
                as: "Products",
                attributes: ["id", "title", "price", "stock", "CategoryId"],
            },
            {
                model: User,
                as: "Users",
                attributes: ["id", "email", "balance", "gender", "role"],
            },
        ]
    }).then(transaction => {
        res.status(200).json({ transactionHistories: transaction })
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
    });
}


module.exports = {
    postTransaction,
    getAllByUser,
    getAllByAdmin,
    getTransactionById
}