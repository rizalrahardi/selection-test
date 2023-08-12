const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.User;

const authMidleware = {
     verifyToken : async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Access Denied!");
        }
    
        try {
            token = token.split(" ")[1];
    
            if (token === "null" || !token) {
                return res.status(401).send("Access Denied!");
            }
    
            const verifiedUser = await jwt.verify(token, process.env.JWT_KEY);
            if (!verifiedUser) {
                return res.status(401).send("Unauthorized request");
            }
    
            req.User = verifiedUser;
            next();
        } catch (err) {
            return res.status(400).send("Invalid Token");
        }
    },
    
     isVerified : async (req, res, next) => {
        try {
            const user = await User.findByPk(req.User.id);
            if (!user) {
                return res.status(404).send("User not found");
            }
            if (!user.isVerified) {
                return res.status(400).send("User not verified, plese verify first");
            }
            next();
        } catch (error) {
            return res.status(500).send("Internal Server Error");
        }
    },
    
     isAdmin : async (req, res, next) => {
        try {
            const user = await User.findByPk(req.User.id);
            const userRole = user.role
            console.log('ini user role', userRole)
            if (userRole !== "admin") {
                return res.status(403).json({ error: "user tidak diizinkan mengakses fitur admin" });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
        }
    },
    
     isCashier : async (req, res, next) => {
        try {
            const user = await User.findByPk(req.User.id);
            const userRole = user.role
            if (userRole !== "cashier") {
                return res.status(403).json({ error: "user tidak diizinkan mengakses fitur cashier" });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Terjadi kesalahan saat memeriksa peran pengguna.' });
        }
    }
}



module.exports = authMidleware
