const User=require("../models/User");
const mailSender=require("../utils/mailSender");



//resetPassword Token
exports.resetPasswordToken=async(req,res)=>{

    try{
         //get email from req body
    const {email}=req.body;

    //check user for this email, email validation
    result =await User.findOne({email});
    
    if (!result) {
        return res.status(404).json({
            success:false,
            message:"Email is not registered"
        })
    }

    //Generate Token
    const token=crypto.randomUUID();

    //update user by adding token and expiration time
    const updateDetails =await User.FindOneAndUpadte(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now() + 5*60*1000
        },
        {new:true}
    )

    //create url
    const url=`http://localhost:3000/update-password/${token}`;

    //sent mail containing the url
    await mailSender(email,
        "Password Reset Link",
        `Password Reset Link: ${url}`
        );

        return res.json({
            success:true,
            message:"Email sent successfully, please chek email and change pwd",
        });

    } 

catch(error){
    console.log(error);
    return res.json({
        success:false,
        message:"Something went wrong while sending reset pwd mail",
    });
}

}


//reset Password
exports.resetPassword=async( req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body; //TOKEN KAISE AYA ISE PATA KARNA HAI FRONENT SE
        
            if(password!==confirmPassword)
            {
                return res.json({
                    success:false,
                    message:"Password not matching"
                });
            }

            //get uerDetails form db using tokne
            const userDetails=await User.findOne({token:token});
            //if no entry - invalid token 
            if(!userDetails){
                return res.json({
                    success:false,
                    message:"Token is invalid",
                });
            }
            
            //token time check 
            if(userDetails.resetPasswordExpires<Date.now()){
                return res.json({
                    success:false,
                    message:"Token is expired , please regenerate your token"
                });
            }

            //has pwd
            const hasedPaword=await bcrypt.has(password,10);

            //password update
            await User.FindOneAndUpadte(
                {token:token},
                {password:hasedPaword},
                {new:true},

            );

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset pwd mail"
        })
    }
}