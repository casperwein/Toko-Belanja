'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            this.belongsTo(models.category, {
                as: "categories",
                foreignKey: "CategoryId",
            });
            this.hasMany(models.transactionhistory, {
                as: "products",
                foreignKey: "ProductId",
            });
        }
    }
    product.init({
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "title is required"
                },
            }
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "price is required"
                },
                isInt: {
                    args: true,
                    msg: "price must be integer"
                },
                max: {
                    args: [50000000],
                    msg: "Maximum 100000000",
                },
                min: {
                    args: [0],
                    msg: "Minimum 0",
                },
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "stock is required"
                },
                isInt: {
                    args: true,
                    msg: "stock must be integer"
                },
                min: {
                    args: [0],
                    msg: "Minimum 0",
                },
            }
        },
        CategoryId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'product',
    });
    return product;
};