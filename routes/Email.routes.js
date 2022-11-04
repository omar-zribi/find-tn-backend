const express = require("express");
const { SendContactPublic } = require("../controllers/ContactPublic.controllers");
const { SendContactPublicValidator, SendContactPublicRules } = require("../middleware/ContactPublic.validator.middleware");


router = express.Router();

router.post('/send', SendContactPublic,SendContactPublicRules(),SendContactPublicValidator)

module.exports=router 