const fs = require("fs").promises;
const path = require("path");
const handlebars = require("handlebars");
const transporter = require("../helpers/transporter");

const sendEmail = async (email, subject, content) => {
    await transporter.sendMail({
        to: email,
        subject: subject,
        html: content,
    });
};
const sendUpdateProfile = async (user, token) => {
    const data = await fs.readFile(
        path.resolve(__dirname, "../emails/registration.html"),
        "utf-8"
    );
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({
        // username: user.username,
        token: token,
    });

    await sendEmail(user.email, "Update your profile", tempResult);
};



module.exports = {
    sendEmail,
    sendUpdateProfile,
};
