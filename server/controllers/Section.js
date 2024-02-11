const Section=require("../models/Section");
const Course=require("../models/Course")


exports.createSecetion=async(req,res)=>{
    try {
        //Data Fetch
        const {sectionName,courseId}=req.body;

        //Data Validation
        if(!sectionName,!courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }
        //Create Section
        const newSection=await Section.create({sectionName});

        //Update course with section objectID
        const updateCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ).pupulate("courseContent").pupulate("subSection").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updateCourseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Sectin, please try again",
            error:error.message
        });
    }
}

//UPDATE SECTION
exports.updateSection=async(req,res)=>{
    try {
        const {sectionName,sectionId}=req.body;

        //Validation
        if(!sectionName,!sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }

        //Update Data
        const section=await Section.findByIdAndUpdate(sectionId,
                        {sectionName:sectionName},
                        {new:true});

        //return res
        return res.status(200).json({
            success:false,
            message:"Missing Properties"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Sectin, please try again",
            error:error.message
        });
    }
}


//DELETE SECTION
exports.deleteSection=async(req,res)=>{
    // const {courseId,sectionId}=req.body;

    //By using Params 
    const {sectionId}=req.params;
    const deleteSection=Section.findByIdAndDelete({_id:sectionId});

    // TODO:Do we need this 
    // const updateCourse=await Course.findByIdAndUpdate(courseId,
    //     {$pull:{courseContent:deleteSection._id}})

}