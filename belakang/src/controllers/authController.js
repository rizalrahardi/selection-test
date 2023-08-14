const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { User } = require('../models')

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            console.log(user)
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: 'Invalid password'
                })
            }
            const token = jwt.sign({
                id: user.id,
            }, process.env.JWT_KEY)
            return res.status(200).json({
                message: 'Login success',
                user,
                token
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }
}

module.exports = authController