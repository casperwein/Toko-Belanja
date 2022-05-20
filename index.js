const express = require('express')
const userRouter = require("./routes/user")
const categoriesRouter = require("./routes/categories")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter)
app.use("/categories", categoriesRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))