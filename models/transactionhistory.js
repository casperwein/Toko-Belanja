"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transactionhistory extends Model {
        static associate(models) {
            this.belongsTo(models.product, {
                as: "Products",
                foreignKey: "ProductId",
            });
            this.belongsTo(models.user, {
                as: "Users",
                foreignKey: "UserId",
            });
        }
    }
    transactionhistory.init({
        ProductId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "quantity is required",
                },
                isInt: {
                    args: true,
                    msg: "quantity must be integer",
                },
            },
        },
        total_price: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "total_price is required",
                },
                isInt: {
                    args: true,
                    msg: "total_price must be integer",
                },
            },
        },
    }, {
        sequelize,
        modelName: "transactionhistory",
    });
    return transactionhistory;
};