const mongoose=require("mongoose");

const dbConnect=async(req,res)=>{
    try {
        await mongoose.connect(process.env.DB_URL);

        res.status(200).json({
            message:"DB Connected"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports=dbConnect;