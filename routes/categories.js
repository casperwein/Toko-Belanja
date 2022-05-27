const express = require("express");
const categoriesController = require("../controller/category-contoller");
const authentication = require("../middleware/authentication").verify;
const { adminAuthorization } = require("../middleware/authorization");
const { findIdCategory } = require("../helpers/findById");
const router = express.Router();

router.use(authentication, adminAuthorization);
router.post("/", categoriesController.postCategories);
router.get("/", categoriesController.getAll);
router.patch(
    "/:categoryId",
    findIdCategory,
    categoriesController.updateCategories
);
router.delete(
    "/:categoryId",
    findIdCategory,
    categoriesController.deleteCategories
);

module.exports = router;