const express = require("express");
const categoriesController = require("../controller/category-contoller")
const authentication = require("../middleware/authentication").verify
const { adminAuthorization, findIdCategory } = require("../middleware/authorization")
const router = express.Router();

router.use(authentication, adminAuthorization);
router.post("/", categoriesController.postCategories);
router.get("/", categoriesController.getAll);
router.delete("/:categoryId", findIdCategory, categoriesController.deleteCategories)

module.exports = router;