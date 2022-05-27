require("dotenv").config();

const express = require("express");
const user = require("./routes/user");
const categories = require("./routes/categories");
const products = require("./routes/products");
const transactions = require("./routes/transactions-history");

const app = express();
const port = process.env.DB_PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", user);
app.use("/categories", categories);
app.use("/products", products);
app.use("/transactions", transactions);

app.listen(port, () => console.log(`App listening on port ${port}!`));