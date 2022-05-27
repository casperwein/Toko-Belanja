const express = require("express");
const transaction = require("../controller/transaction-histories-controller");
const {
    customerAuthorization,
    adminAuthorization,
} = require("../middleware/authorization");
const authentication = require("../middleware/authentication").verify;
const { findIdProductTransaction: findID } = require("../helpers/findById");

const router = express.Router();

router.post("/", authentication, findID, transaction.postTransaction);
router.get(
    "/user",
    authentication,
    customerAuthorization,
    transaction.getAllByUser
);
router.get(
    "/admin",
    authentication,
    adminAuthorization,
    transaction.getAllByAdmin
);
router.get(
    "/:transactionId",
    authentication,
    adminAuthorization,
    transaction.getTransactionById
);

module.exports = router;