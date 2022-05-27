require("dotenv").config();

module.exports = {
    // development: {
    //     username: "djzrzdujsjwqqw",
    //     password: "378f8c27c2d8c7b05918b7f7a3eeaf4134566581b8014ceb6fc14f9dff767e68",
    //     database: "da7up93119ppsb",
    //     port: 5432,
    //     host: "ec2-3-223-213-207.compute-1.amazonaws.com",
    //     dialect: "postgres",
    //     dialectOptions: {
    //         ssl: {
    //             require: true,
    //             rejectUnauthorized: false,
    //         }
    //     }
    // },

    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres"
    },

    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres"
    },

    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    }
}