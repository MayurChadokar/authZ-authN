const express= require("express");
const router=express.Router();


const {login, signup,forgetPassword}=require("../controller/auth");
const {auth, isStudent, isAdmin} = require("../middleware/Auth")
router.post("/login",login);
router.post("/signup",signup);
router.post("/forget-password",forgetPassword);


router.get('/student',auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for student"
    });

});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protect route for admin ",
    });
});


module.exports =router;