const { attendanceController } = require("../controllers");
const authMidleware = require("../middlewares/auth");

const router = require("express").Router();

router.post("/in", authMidleware.verifyToken, authMidleware.isEmployee, attendanceController.clockIn)
router.post("/out", authMidleware.verifyToken, authMidleware.isEmployee, attendanceController.clockOut)
router.get("/user", authMidleware.verifyToken, authMidleware.isEmployee, attendanceController.getAttendanceLogUser)
module.exports = router;