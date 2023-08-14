const { salaryController } = require("../controllers");
const authMidleware = require("../middlewares/auth");

const router = require("express").Router();

router.get("/report", authMidleware.verifyToken, authMidleware.isEmployee, salaryController.generateMonthSalary)
router.get("/all", authMidleware.verifyToken, authMidleware.isEmployee, salaryController.generateAllSalary)

module.exports = router;