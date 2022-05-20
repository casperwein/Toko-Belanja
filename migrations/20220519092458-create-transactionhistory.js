'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transactionhistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ProductId: {
                type: Sequelize.INTEGER
            },
            UserId: {
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            total_price: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(() => queryInterface.addConstraint("transactionhistories", {
            fields: ["UserId"],
            type: "foreign key",
            name: "user_fk",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        })).then(() => queryInterface.addConstraint("transactionhistories", {
            fields: ["ProductId"],
            type: "foreign key",
            name: "product_fk",
            references: {
                table: "products",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        }));
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transactionhistories');
    }
};