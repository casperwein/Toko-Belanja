'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            stock: {
                type: Sequelize.INTEGER
            },
            CategoryId: {
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
        }).then(() => queryInterface.addConstraint("products", {
            fields: ["CategoryId"],
            type: "foreign key",
            name: "category_fk",
            references: {
                table: "categories",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        }));
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};