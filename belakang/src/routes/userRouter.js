const { userController } = require("../controllers");
const authMidleware = require("../middlewares/auth");

const router = require("express").Router();

router.post("/register", authMidleware.verifyToken, authMidleware.isAdmin, userController.sendEmailRegistration)
router.post("/profile", authMidleware.verifyToken, authMidleware.isEmployee, userController.updateUserProfile)
router.get("/", authMidleware.verifyToken, userController.getUserLogin)
module.exports = router;