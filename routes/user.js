const express = require("express");
const userController = require("../controller/user-controller");
const authentication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization").userAuthorization;
const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/", userController.usergetall);
router.use(authentication);
router.put("/:userId", authorization, userController.userUpdate);
router.delete("/:userId", authorization, userController.userDelete);
router.patch("/topup", userController.userTopUp);

module.exports = router;