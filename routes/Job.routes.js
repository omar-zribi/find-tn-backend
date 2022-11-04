const express = require("express");
const { addjob, getAllJobOneUser, getOneJobOneUser, updateOneJobOneUser, deleteOneJobOneUser, getAllJobAllUser } = require("../controllers/Job.controllers");
const { AddJobValidator, AddJobRules } = require("../middleware/Job.validator.middleware");

router = express.Router();

// to add job
router.post("/:userName/addjob", AddJobRules(), AddJobValidator, addjob);
// to get all job of one user
router.get("/:userName/alljob",getAllJobOneUser); 
// to get one job of one user
router.get("/:userName/:_id",getOneJobOneUser);
// to update one job of one user
router.put("/:userName/:_id/update",updateOneJobOneUser);
// to delete one job of one user
router.delete("/:userName/:_id/delete",deleteOneJobOneUser);
// to get all job of all user
router.get("/alljob",getAllJobAllUser);

module.exports=router