const attendance = require('./attendanceRouter');
const auth = require('./authRouter');
const user = require('./userRouter');
const salary = require('./salaryRouter')
module.exports = {
    attendance,
    auth,
    user,
    salary
}