const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jobSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    fullUserName: {
        type: String,
        require: true
    },
    userSex: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    etabOrigin: {
        type: String,
        required: true,
    },
    gouvernerat: {
        type: String,
        required: true,
    },
    posteAcctuel: {
        type: String,
        required: true,
    },
    futurEtabOrigin: {
        type: String,
    },
    futurGouvernerat: {
        type: String,
    },
    futurPoste: {
        type: String,
    },
    description: {
        type: String,
    },
});
module.exports = mongoose.model("job", jobSchema)