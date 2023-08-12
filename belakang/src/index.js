const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});
const express = require('express')
const cors = require('cors')
const db = require('../src/models')

const { attendance, auth, user } = require('../src/routes')

// db.sequelize.sync({ alter: true })

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
    cors({
        origin: [
            process.env.WHITELISTED_DOMAIN &&
            process.env.WHITELISTED_DOMAIN.split(","),
        ],
    })
);

app.use(express.json());
app.get("/api", (req, res) => {
    res.send(`yooo jalan nih`);
});
app.use('/api/attendance', attendance)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/public', express.static(path.resolve(__dirname, "../public")))


// not found
app.use((req, res, next) => {
    if (req.path.includes("/api/")) {
        res.status(404).send("gak ketemu, cek routing !");
    } else {
        next();
    }
});

// error
app.use((err, req, res, next) => {
    if (req.path.includes("/api/")) {
        console.error("Error yah : ", err.stack);
        res.status(500).send("Error yah !");
    } else {
        next();
    }
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(`error cuy : ${error}`)
    } else {
        console.log(`jalan cuy : ${PORT}`)
    }
})