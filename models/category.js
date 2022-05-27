"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            this.hasMany(models.product, {
                as: "Products",
                foreignKey: "CategoryId",
            });
        }
    }
    category.init({
        type: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "type is required",
                },
            },
        },
        sold_product_amount: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "sold_product_amount is required",
                },
                isInt: {
                    args: true,
                    msg: "sold_product_amount must be integer",
                },
            },
        },
    }, {
        sequelize,
        modelName: "category",
        hooks: {
            beforeCreate: (category, opt) => {
                const sold_product_amount = 0;
                category.sold_product_amount = sold_product_amount;
            },
        },
    });
    return category;
};