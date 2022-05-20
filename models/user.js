"use strict";

const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            this.hasMany(models.category, {
                as: "user",
                foreignKey: "id",
            });
            this.hasMany(models.transactionhistory, {
                as: "users",
                foreignKey: "UserId",
            });
        }
    }
    user.init({
        full_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "full_name is required"
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email address already in use. Try another one!'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email is required"
                },
                isEmail: {
                    args: true,
                    msg: "email must be valid"
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 10],
                    msg: "The password length should be between 6 and 10 characters.",
                },
                notEmpty: {
                    args: true,
                    msg: "Password is required"
                },
            }
        },
        gender: {
            type: DataTypes.STRING,
            values: ["male", "female"],
            validate: {
                isIn: {
                    args: [
                        ["male", "female"]
                    ],
                    msg: "gender must be male or female",
                },
                notEmpty: {
                    args: true,
                    msg: "gender is required"
                },
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ["admin", "customer"],
            validate: {
                isIn: {
                    args: [
                        ["admin", "customer"]
                    ],
                    msg: "role must be admin or customer",
                },
                notEmpty: {
                    args: true,
                    msg: "role is required"
                },
            }

        },
        balance: {
            type: DataTypes.INTEGER,
            validate: {
                max: {
                    args: [100000000],
                    msg: "Maximum 100000000",
                },
                min: {
                    args: [0],
                    msg: "Minimum 0",
                },
                notEmpty: {
                    args: true,
                    msg: "balance is required"
                },
                isInt: {
                    args: true,
                    msg: "balance must be integer"
                }
            }
        },
    }, {
        sequelize,
        modelName: "user",
        hooks: {
            beforeCreate: (user, opt) => {
                const hashedPassword = hashPassword(user.password);
                const userBalance = 0;
                user.password = hashedPassword;
                user.balance = userBalance;
            },
        }
    });
    return user;
};