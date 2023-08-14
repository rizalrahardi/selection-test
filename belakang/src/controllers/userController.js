const { User, sequelize } = require('../models')
const { emailService, utils } = require('../services')

const userController = {
    sendEmailRegistration: async (req, res) => {
        try {
            const { email, join, baseSalary, role } = req.body
            await sequelize.transaction(async (t) => {
                const user = await User.create({
                    email,
                    join,
                    baseSalary,
                    roleId: role,
                }, { transaction: t })
                console.log(user)
                const token = await utils.generateToken(user.id)
                await emailService.sendUpdateProfile(user, token)
                res.status(200).json({
                    message: 'success',
                    user: user,
                    token: token
                })
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error
            })

        }
    },
    updateUserProfile: async (req, res) => {
        try {
            const { name, birthday, password, confirmPassword } = req.body
            if (password !== confirmPassword) {
                return res.status(400).json({
                    message: 'Password does not match'
                })
            }
            const { id } = req.user
            const user = await User.findByPk(id)
            if (user.name && user.birthday && user.password !== null) {
                return res.status(400).json({
                    message: 'Data already exists, you cannot update profile again'
                })
            }
            const hashPass = await utils.hashedPassword(password)
            await sequelize.transaction(async (t) => {
                user.name = name
                user.birthday = birthday
                user.password = hashPass
                await user.save({ transaction: t })
                res.status(200).json({
                    message: 'success',
                    user: user
                })
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error
            })
        }
    },
    getUserLogin: async (req, res) => {
        try {
            const { id } = req.user
            const user = await User.findByPk(id)
            res.status(200).json({
                message: 'success',
                user
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }
}

module.exports = userController