const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


//auth
exports.auth=async (req,res,next)=>{
    try {
        //extract token
        const token=req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                messageL:"Token is missing",
            })
        }

        //Verify Token
        try {
            const decode=await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode; //SAVING DECODE DATA INTO USER REQ
        } catch (error) {
            //verificaion - issue
            return res.status(401).json({
                success:false,
                message:"Toen is invalid"
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something Went wrong while validating the token"
    });
    }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try {
        
        if(req.user.accountType != "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route Studnet Only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role not defined"
    })
}   
}


//isInstructor
exports.isInstructor=async(req,res, next)=>{
    try {
        
        if(req.user.accountType != "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route Instructor Only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role not defined "
    })
}   


}



//isAdmin
exports.isAdmin=async(req,res)=>{
    try {
        console.log("Inside the isAdmin",req.user.accountType);
        
        if(req.user.accountType != "Admin "){
            return res.status(401).json({
                success:false,
                message:"This is a protected route isAdmin Only"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User role not defined "
    })
}   
}

