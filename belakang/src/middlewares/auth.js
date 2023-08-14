const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { utils } = require("../services");

const authMidleware = {
    verifyToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Access Denied!");
        }

        try {
            token = token.split(" ")[1];

            if (token === "null" || !token) {
                return res.status(401).send("Access Denied!");
            }

            const verifiedUser = await utils.decodedToken(token);
            req.user = verifiedUser;
            console.log(req.user)
            next();
        } catch (err) {
            return res.status(400).send("Invalid Token");
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.user.id);
            console.log(user)
            const userRole = user.roleId
            console.log(userRole)
            if (userRole !== 1) {
                return res.status(403).json({ error: "user tidak diizinkan mengakses fitur admin" });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
        }
    },

    isEmployee: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.user.id);
            const userRole = user.roleId
            if (userRole !== 2) {
                return res.status(403).json({ error: "user tidak diizinkan mengakses fitur employee" });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
        }
    }
}



module.exports = authMidleware
