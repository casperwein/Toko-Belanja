const express = require("express")
const transaction = require("../controller/transaction-histories-controller")
const { customerAuthorization, adminAuthorization } = require("../middleware/authorization")
const authentication = require("../middleware/authentication").verify
const router = express.Router()

router.post("/", authentication, transaction.postTransaction)
router.get("/", authentication, customerAuthorization, transaction.getAllByUser)
router.get("/admin", authentication, adminAuthorization, transaction.getAllByAdmin)

module.exports = router