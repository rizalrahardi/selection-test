const attendance = require('./attendanceRouter');
const auth = require('./authRouter');
const user = require('./userRouter');

module.exports = {
    attendance,
    auth,
    user
}