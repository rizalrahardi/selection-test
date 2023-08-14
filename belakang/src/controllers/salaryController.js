const { User, Attendance, MonthSalary, sequelize, Sequelize, Role } = require('../models');

const salaryController = {
    generateMonthSalary: async (req, res) => {
        try {
            const { month, year } = req.query;
            const { id } = req.user

            const monthSalary = await MonthSalary.findOne({
                where: {
                    userId: id,
                    month: month,
                    year: year,
                },
                include: [{
                    model: User,
                    attributes: ['name', 'baseSalary', 'join'],
                    include: [{
                        model: Role,
                        attributes: ['name']
                    }]
                }]
            })
            return res.status(200).json({
                message: 'success',
                monthSalary
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    generateAllSalary: async (req, res) => {
        try {
            const monthSalary = await MonthSalary.findAll({
                include: [{
                    model: User,
                    attributes: ['name', 'baseSalary', 'join'],
                    include: [{
                        model: Role,
                        attributes: ['name']
                    }]
                }]
            })
            return res.status(200).json({
                message: 'success',
                monthSalary
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    }
};

module.exports = salaryController;
