const Job = require('../model/Job');
const User = require('../model/User');

// to add job
exports.addjob = async (req, res) => {
    const { futurEtabOrigin, futurGouvernerat, futurPoste, description} = req.body;
    const token = localStorage.getItem('token');
    try {
        const theUser = await User.findOne({ userName: req.params.userName });
        if ((theUser) && (token)) {
            const theJob = new Job({
                userName, fullUserName, userSex, email, etabOrigin, gouvernerat,
                posteAcctuel, futurEtabOrigin, futurGouvernerat, futurPoste,description
            })
            theJob.userName = theUser.userName;
            theJob.fullUserName = theUser.fullUserName;
            theJob.userSex = theUser.userSex;
            theJob.email = theUser.email;
            theJob.etabOrigin = theUser.etabOrigin;
            theJob.gouvernerat = theUser.gouvernerat;
            theJob.posteAcctuel = theUser.posteAcctuel;
            theJob.futurEtabOrigin = req.body.futurEtabOrigin;
            theJob.futurGouvernerat = req.body.futurGouvernerat;
            theJob.futurPoste = req.body.futurPoste;
            theJob.description = req.body.description;
            await theJob.save();
            res.status(201).json({
                msg: `the new job of ${theJob.fullUserName} is created with successfully`,
                job: theJob,
            });
        }
        else { res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" }) }
    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to get all job of one user
exports.getAllJobOneUser = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
        if (!token){res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" })}
        const theJob = await Job.findOne({ userName: req.params.userName });
        if (!theJob){res.status(403).json({ msg: "cette page ne contient aucune information" })}
        else if ((theJob)&&(token)){
            res.status(201).json({
                msg: `these  are all job of ${theJob.fullUserName}`,
                job: theJob,
            });
        }
        else { res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" }) }
    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to get one job of one user
exports.getOneJobOneUser = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
        if (!token){res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" })}
        const theJob = await Job.findOne({userName:req.params.userName,_id:req.params._id});
            if (!theJob){res.status(403).json({ msg: "cette page ne contient aucune information" })}
            else if ((theJob)&&(token)){
                res.status(201).json({
                    msg: `this is the job that id=${theJob._id} of ${theJob.fullUserName}`,
                    job: theJob,
                });
            }
            else { res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" }) }
    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to update one job of one user
exports.updateOneJobOneUser = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
        if (!token){res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" })}
        const theJob = await Job.findOneAndUpdate({userName:req.params.userName,_id:req.params._id});
            if (!theJob){res.status(403).json({ msg: "cette page ne contient aucune information" })}
            else if ((theJob)&&(token)){
                await theJob.save();
                res.status(201).json({
                    msg: `the job that id=${theJob._id} of ${theJob.fullUserName} is upfat with successfully`,
                    job: theJob,
                });
            }
            else { res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" }) }
    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to delete one job of one user
exports.deleteOneJobOneUser = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
        if (!token){res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" })}
        const theJob = await Job.findOneAndDelete({userName:req.params.userName,_id:req.params._id});
            if (!theJob){res.status(403).json({ msg: "cette page ne contient aucune information" })}
            else if ((theJob)&&(token)){
                res.status(201).json({
                    msg: `this job is deleted with successfully`,
                });
            }
            else { res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" }) }

    } catch (error) { res.status(500).json({ msg: error.message }); }
}
// to get all job of all user
exports.getAllJobAllUser = async (req, res) => {
    const token = localStorage.getItem('token');
    try {
        if (!token){res.status(403).json({ msg: "vous n'êtes pas autorisé à consulter cette page" })}
        const theJob = await Job.find()
        if (!theJob){res.status(403).json({ msg: "cette page ne contient aucune information" })}
            else if ((theJob)&&(token)){
                res.status(201).json({
                    msg: `these are all job`,
                    job:theJob
                });
            }
    } catch (error) { res.status(500).json({ msg: error.message }); }
}

