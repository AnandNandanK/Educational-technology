const  nodemailer=require("nodemailer");

const mailSender=async(email,title,body)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:smtp.gmail.com,
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        let info=await transporter.sendMail({
            from:"Anand",
            to:email,
            subject:title,
            html:body
        })

        return info;
        
        console.log(info);
    } catch (error) {
        console.log("Somthing wrong in sending email in mailSender.js ",error);
    }
}

module.exports=mailSender;