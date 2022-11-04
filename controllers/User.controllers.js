const User = require('../model/User');
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const config = require("config");
const secret = config.get("secret");
const user = config.get("user");
const pass = config.get("pass");
const host = config.get("host");
const port = config.get("port");

// to sign-up user
exports.userSignUp = async (req, res) => {
    const { userName,fullUserName, userSex, email, etabOrigin, gouvernerat, posteAcctuel, password, role } = req.body;
    try {
        const theUser = await User.findOne({ email })
        if (theUser) { res.status(401).json({ msg: "this email is already exists" }) }
        else {
            const theUser = new
                User({ userName,fullUserName, userSex, email, etabOrigin, gouvernerat, posteAcctuel, password, role })
            if (theUser.role === null) { theUser.role = "user" }
            theUser.fullUserName=req.body.userName;
            theUser.activationCode = ((Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)).toString());
            var transporter = nodemailer.createTransport({
                host: host, port: port, secure: false, auth: { user: user, pass: pass }
            });
            var mailOptions = {
                from: user, to: theUser.email, subject: 'activation compte',
                text: ` cher ${theUser.fullUserName} votre code d'activation est ${theUser.activationCode}`
            };
            transporter.sendMail(mailOptions, function (error) {
                if (error) (res.status(500).json({ msg: error.message }))
            });
            const salt = await bc.genSalt(15);
            const hash = bc.hashSync(password, salt);
            theUser.password = hash;

            const allTheUser = await User.find({ userName })
            let verifAllUserName
            let verifuserName
            if (allTheUser.length === 0) { theUser.userName = userName }
            else {
                let i = 0;
                do {
                    i += 1;
                    verifuserName = userName + (i).toString()
                    verifAllUserName = await User.find({ verifuserName })
                    theUser.userName = userName + (verifAllUserName.length).toString()
                } while (verifAllUserName.length === 0)
            }
            await theUser.save();
            const payload = {
                id: theUser._id,
                userName: theUser.userName,
                role: theUser.role,
            };
            const token = jwt.sign(payload, secret);
            res.status(201).json({
                msg: `profile of ${theUser.userName} is created with successfully`,
                token,
                user: theUser,
            });
        }
    }
    catch (error) { res.status(500).json({ msg: error.message }); }
}
// to log-in user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const theUser = await User.findOne({ email });
        if (!theUser) { res.status(401).json({ msg: "invalid email or password" }) }
        const isMatch = await bc.compare(password, theUser.password)
        if (!isMatch) { res.status(401).json({ msg: "invalid email or password" }) }
        const payload = {
            id: theUser._id,
            userName: theUser.userName,
            role: theUser.role,
        };
        const token = jwt.sign(payload, secret);
        res.status(203).json({
            msg: `profile of ${theUser.fullUserName} is connected with successfully`,
            token,
            user: theUser,
        })
    }
    catch (error) { res.status(500).json({ msg: error.message }); }
}
// to verify activation compte
exports.verifyActivationCompte = async (req, res) => {
    const { activationCode } = req.body;
    try {
        const theUser = await User.findOne({ userName: req.params.userName });
        if ((theUser.activationCode) !== activationCode) {
            res.status(401).json({ msg: "invalid activation code" })
        }
        else if ((theUser.activationCode) === activationCode) {
            theUser.isActive = true
        }
        var transporter = nodemailer.createTransport({
            host: host, port: port, secure: false, auth: { user: user, pass: pass }
        });
        var mailOptions = {
            from: user, to: theUser.email, subject: `bienvenue chez find.tn`,
            text:` cher ${theUser.fullUserName} Vous faites désormais partie de la famille find.tn! 
nous sommes là pour vous aider a trouver des nouvelles opportunités!
Notre site garantit une totale confidentialité.
Veuillez ne pas publier ou envoyer vos informations personnelles via les messages`
        };
        transporter.sendMail(mailOptions, function (error) {
            if (error) (res.status(500).json({ msg: error.message }))
        });
        await theUser.save();
        const payload = {
            id: theUser._id,
            userName: theUser.userName,
            role: theUser.role,
        };
        const token = jwt.sign(payload, secret);
        res.status(203).json({
            msg: `profile of ${theUser.fullUserName} is active with successfully`,
            token,
            user: theUser,
        })
    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find();
        if (allUser) {
            res.status(201).json({
                msg: `list ${allUser.length} users`,
                user: allUser,
            });
        }
    } catch (error) { res.status(500).json({ msg: error.message }); }
};
// to get one user
exports.getOneUser = async (req, res) => {
    try {
        const theUser = await User.findOne({ userName: req.params.userName });
        const token = localStorage.getItem('token');
        if (theUser) {
            res.status(201).json({
                msg: `this is the profile of ${theUser.fullUserName}`,
                token,
                user: theUser,
            });
        }
    } catch (error) { res.status(500).json({ msg: error.message }); }
};
// to update user
exports.updateUser = async (req, res) => {
    const { etabOrigin, gouvernerat, posteAcctuel, password, newPasswordA, newPasswordB } = req.body;
    const { userName } = req.params;
    try {
        const theUser = await User.findOneAndUpdate({ userName }, { ...req.body }, { new: true });

        if (!theUser) { res.status(401).json({ msg: "invalid User" }) }
        //     const isMatch = await bc.compare(password, theUser.password)
        //     if (!isMatch) { res.status(401).json({ msg: "invalid password" }) }
        ((etabOrigin !== null) || (etabOrigin !== ""))
            ?
            (theUser.etabOrigin = etabOrigin)
            :
            ((gouvernerat !== null) || (gouvernerat !== ""))
                ?
                (theUser.gouvernerat = gouvernerat)
                :
                ((posteAcctuel !== null) || (posteAcctuel !== ""))
                    ?
                    (theUser.posteAcctuel = posteAcctuel)
                    :
                    (theUser.posteAcctuel = theUser.posteAcctuel);
        const salt = await bc.genSalt(15);
        const hash = bc.hashSync(password, salt);
        theUser.password = hash;
        theUser.__v = (theUser.__v)++;
        await theUser.save();
        const payload = {
            id: theUser._id,
            userName: theUser.userName,
            role: theUser.role,
        };
        const token = jwt.sign(payload, secret);
        res.status(201).json({
            msg: `profile of ${theUser.fullUserName} is updated with successfully`,
            token,
            user: theUser,
        });
    } catch (error) { res.status(500).json({ msg: error.message }); }
};
// to delete one user
exports.deleteUser = async (req, res) => {
    const { userName } = req.params;
    try {
        const theUser = await User.findOneAndDelete({ userName });
        res.status(201).json({ msg: "User is deleted with successfully" })
    } catch (error) { res.status(500).json({ msg: error.message }); }
};
// to log-out user
exports.logOutUser = async (req, res) => {
    try {
        const theUser = await User.findOne({ userName: req.params.userName });
        const token = localStorage.getItem("token");
        if ((theUser) && (token)) {
            const token = localStorage.removeItem('token');
            res.status(201).json({
                msg: "User is disconnected ",
                token: localStorage.removeItem('token'),
                user: null
            });
        }
    } catch (error) { res.status(500).json({ msg: error.message }); }
};