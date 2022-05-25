const express = require("express");
const product = require("../controller/product-controller")
const authentication = require("../middleware/authentication").verify
const { adminAuthorization } = require("../middleware/authorization")
const { findIdProduct } = require("../helpers/findById")

const router = express.Router();
router.use(authentication);

router.get("/", product.getProducts)

router.use(adminAuthorization);

router.post("/", product.postProducts)
router.put("/:productId", findIdProduct, product.updateProducts)
router.delete("/:productId", findIdProduct, product.deleteProducts)
router.patch("/:productId", findIdProduct, product.updateCategoryId)

module.exports = router;