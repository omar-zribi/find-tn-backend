const PublicMsg = require('../model/PublicMsg');
const nodemailer = require('nodemailer');
const config = require("config");
const user = config.get("user");
const pass = config.get("pass");
const host = config.get("host");
const port = config.get("port");

exports.SendContactPublic = async (req, res) => {
    const { fullName, email,company, message } = req.body;
    try {
        const newPublicMsg = new PublicMsg({ fullName, email,company, message });

        await newPublicMsg.save();
        var transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
                user: user,
                pass: pass
            }
        });
        var mailOptions = {
            from: user,
            to: user,
            subject: `from public contact form`,
            text: `
            fullName: ${newPublicMsg.fullName} 
            email: ${newPublicMsg.email} 
            company: ${newPublicMsg.company} 
            message: ${newPublicMsg.message}`
        };

        transporter.sendMail(mailOptions, function (error) {
            (error)
            ?
            (res.status(500).json({ msg: error.message }))
            :
            (res.status(201).json({
                PublicMsg: {
                    subject: `from public contact form`,
                    fullName: newPublicMsg.fullName,
                    email: newPublicMsg.email,
                    company:newPublicMsg.company,
                    message:newPublicMsg.message
                }}))});
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}