const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PublicMsgSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
   company: {type: String,},
  message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("PublicMsg", PublicMsgSchema)