const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");


exports.sendOTP = async (req, res) => {

    try {

        //fetch email from requerst body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });


        //if USer already exist,then return response
        if (checkUserPresent) {
            return res.status(401).json({
                return: false,
                message: "User already register"
            })
        }


        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        console.log("OTP generated: ", otp);

        //check uniqu otp or not 
        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);

        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            sucess: false,

        })
    }
}

//SIGN UP 

exports.SignUp = async (req, res) => {

    try {

        //data fetch
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        //VALIDATE
        if (firstName || lastName || email || password || confirmPassword || accountType || contactNumber || otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        //MATCH BOTH PASSWORD
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword value does not match, please try again "
            })
        }

        //Cheack User already exist or not
        const existingUSer = await User.findOne({ email });
        if (existingUSer) {
            return res.status(400).json({
                success: false,
                message: "use is already registered"
            })
        }

        //fint most recent otp for the user
        const recnetOtp = await otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recnetOtp);

        //validate Otp
        if (recnetOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not Found"
            })
        } else if (otp !== recnetOtp.otp) {
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        //Hash Password
        const hasedPaword = await bcrypt.has(password, 10);

        //Create Entry in Db of profile

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hasedPaword,
            accountType,
            additionalDetails: profileDetails,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User is registered Successfully",
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can not register please try again" 
        })
    }



}


//LOGIN
exports.login=async(req,res)=>{
    try {
        //Get Data From req body
        const {email,password}=req.body;


        //Data validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required , please try again"
            });
        }

        //user Exist or Not
        const user=await User.findone({email}).populate("additionalDetails");
        if(!user){
        }

        //generate tocken after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token=token;
            user.password=undefined;
        


        //create cookie and send response
        const option={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,option).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in successfully",
        })

    }else{
        return res.status(402).json({
            success:false,
            message:"Password is incorrect"
        })
    }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, Please try again"
        });
    }
};

//changePassword
exports.changePassword=async (req,res)=>{
    //get data from req body
    //get oldPassword, newPassword, confirmNewPassword
    //validation

    //update pwd in DB
    //sent mail - Password updated
    //return response
}

