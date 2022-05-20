'use strict';

const { hashPassword } = require("../helpers/bcrypt")
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("users", [{
            full_name: "ronaldo cristiano",
            email: "ronaldo@gmail.com",
            password: `${hashPassword("ronaldo")}`,
            gender: "male",
            role: "admin",
            balance: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};