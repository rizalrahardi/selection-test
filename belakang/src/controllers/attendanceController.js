const { Op } = require('sequelize');
const { User, Attendance, sequelize, MonthSalary } = require('../models')
updateOrCreateMonthSalary = async (user, attendance, transaction, isClockOut) => {
    const month = attendance.clockIn.getMonth() + 1; // JavaScript months are zero-based
    const year = attendance.clockIn.getFullYear();

    const monthSalary = await MonthSalary.findOne({
        where: {
            userId: user.id,
            month: month,
            year: year,
        },
        transaction: transaction,
    });
    let daySalaryToAdd = 0;
    let deductionToAdd = 0;
    if (isClockOut) {
        daySalaryToAdd += attendance.daySalary / 2;
        console.log(123, daySalaryToAdd)
        monthSalary.deduction -= attendance.daySalary / 2;
    } else {
        daySalaryToAdd += attendance.daySalary;
        deductionToAdd += attendance.daySalary;
    }
    if (!monthSalary) {
        await MonthSalary.create({
            userId: user.id,
            month: month,
            year: year,
            monthSalary: daySalaryToAdd, // Add full daySalary
            deduction: deductionToAdd, // You can calculate this based on your logic
        }, { transaction: transaction });
    } else {
        monthSalary.monthSalary += daySalaryToAdd; // Add full daySalary
        monthSalary.deduction += deductionToAdd;
        await monthSalary.save({ transaction: transaction });
    }

}

const attendanceController = {
    clockIn: async (req, res) => {
        try {
            const { currentTime } = req.body;
            const { id } = req.user
            const localTime = new Date(currentTime);
            const utcTime = new Date(localTime.getTime() + (7 * 60 + localTime.getTimezoneOffset()) * 60000);
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const latestAttendance = await Attendance.findOne({
                where: { userId: id },
                order: [['createdAt', 'DESC']],
            });
            if (latestAttendance && !latestAttendance.clockOut) {
                return res.status(400).json({ message: 'User has already clocked in.' });
            }
            const todayAttendance = await Attendance.findOne({
                where: {
                    userId: id,
                    createdAt: {
                        [Op.gte]: new Date().setHours(0, 0, 0, 0),
                        [Op.lte]: new Date().setHours(23, 59, 59, 999),
                    },
                },
            });
            if (todayAttendance) {
                return res.status(400).json({ message: 'User has already clocked in today.' });
            }
            const daySalary = (user.baseSalary / 20) * 0.5;
            await sequelize.transaction(async (t) => {
                const attendance = await Attendance.create(
                    {
                        userId: id,
                        clockIn: utcTime,
                        daySalary,
                    },
                    { transaction: t }
                );
                await updateOrCreateMonthSalary(user, attendance, t, false);
                res.status(201).json({
                    message: 'Clock in recorded successfully.',
                    attendance: attendance,
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred while recording clock in.',
            });
        }
    },
    clockOut: async (req, res) => {
        try {
            const { id } = req.user;
            const { currentTime } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const latestAttendance = await Attendance.findOne({
                where: { userId: id },
                order: [['createdAt', 'DESC']],
            });

            if (!latestAttendance || latestAttendance.clockOut) {
                return res.status(400).json({ message: 'Invalid clock out request.' });
            }

            const daySalary = user.baseSalary / 20;

            const localTime = new Date(currentTime);
            const utcTime = new Date(localTime.getTime() + (7 * 60 + localTime.getTimezoneOffset()) * 60000);

            // Calculate the UTC clockOut time of latestAttendance
            const utcLatestClockIn = latestAttendance.clockIn.getTime() - (7 * 60 + latestAttendance.clockIn.getTimezoneOffset()) * 60000;
            const elapsedTimeSinceClockIn = utcTime - utcLatestClockIn;

            if (elapsedTimeSinceClockIn < 0) {
                return res.status(400).json({ message: 'Invalid clock out request. Clock out time is earlier than clock in time.' });
            }

            await sequelize.transaction(async (t) => {
                const updatedAttendance = await latestAttendance.update(
                    {
                        clockOut: utcTime,
                        daySalary,
                    },
                    { transaction: t }
                );
                await updateOrCreateMonthSalary(user, updatedAttendance, t, true);

                res.status(200).json({
                    message: 'Clock out recorded successfully.',
                    attendance: updatedAttendance,
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred while recording clock out.',
            });
        }
    },

    getAttendanceLogUser: async (req, res) => {
        try {
            const { id } = req.user
            const attendance = await Attendance.findAll({
                where: {
                    userId: id
                }
            })
            res.status(200).json({
                message: 'success',
                attendance
            })

        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }
}

module.exports = attendanceController