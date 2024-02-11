const {instance}=require("../config/razorpayConfig")
const Course=require("../models/Course")
const  User=require("../models/User")
const mailSender=require("../utils/mailSender")//exports.module=mailsender
const {courseEnrollmentEmail}=require("") //exports.moduleName=()=>{}
const { Mongoose } = require("mongoose")


exports.capturePayment=async(req,res)=>{
    //get courseId and UserId

    const {course_id}=req.body;
    const userId=req.user.id;

    //validation
    //valid courseId

    if(!course_id){
        return res.json({
            success:false,
            message:"Please provide valid course ID"
        })
    };

    //Valid courseDetails
    let course;

    try {
        course=await Course.findById(course_id)
        if(!course){
            return res.json({
                success:false,
                message:"Could not find the course"
            })
        }

        //user alrady pay for same course
        const uid = new Mongoose.Type.ObjectId(userId);//CONVERTING STRING id TO OBJ ID //This means you're specifically generating an ObjectId based on a given userId. 
                                                        //It's like asking for a new, unique identification card (ObjectId) for a person (userId).
        if(course.studentEnrolled.includes(uid)){
            if(!course){
            return res.json({
                success:false,
                message:"Student is already enrolled"
            })
        }
        }
        //Order Create
    } catch (error) {
        
    }
}