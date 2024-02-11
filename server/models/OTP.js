const { Mongoose } = require("mongoose");
const mailSender =require("../utils/mailSender");
const OtpSchema=Mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})

async function sendEmailVerification(email,otp){
    try {
        const response=mailSender(email);
        console.log("Mail Sent Succesfully");
    }
    catch (error) {
        console.log("Erro while sending mail");
        throw(error);
    }
}
 
OtpSchema.pre("save",async function(next){
    await sendEmailVerification(this.email,this.otp);
})


module.exports=Mongoose.model("otpSchema",OtpSchema);