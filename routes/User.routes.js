const express = require("express");

const {userSignUp, loginUser, getOneUser, getAllUsers, deleteUser, updateUser, verifyActivationCompte, logOutUser}=require('../controllers/user.controllers');
const {userAuth}=require('../middleware/User.auth.middleware')
const { userSingUpRules, userSingUpdValidator } = require("../middleware/User.validator.middleware");
router = express.Router();

// to sign-up user
router.post("/signup", userSingUpRules(), userSingUpdValidator, userSignUp);
// to log-in user
router.post("/login",loginUser);
// to verify activation compte
router.post("/activation/:userName",verifyActivationCompte);
// to get all users
router.get("/getall",getAllUsers); 
// to get one user
router.get("/:userName",getOneUser,userAuth);
// to update user
router.put("/update/:userName",updateUser);
// to delete one user
router.delete("/delete/:userName",deleteUser);
// to log-out user
router.get("/logout/:userName",logOutUser);

module.exports=router