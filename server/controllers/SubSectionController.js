const SubSection=require("../models/Subsection");
const Section=require("../models/Section");


//CREATE SUBSECTION
exports.createSubSection = async (req,res)=>{
    try {
        //fetchdata from req BOdy
        const {sectionId,title,timeDuration,description}=req.body;

        //Extract video
        const video =req.fiels.videoFile;

        //validation
        if(!sectionId||!title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //Upload video to cloudinary
        const uploadDetails=await uploadImageToCLoudinary(video,process.env.FOLDER_NAME);

        //create a sub-section
        const SubSectionDetais=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoURL:uploadDetails.secure_url
        })

        //update section with this sub section ObjectId
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                            {
                                                $push:{
                                                    SubSection:SubSectionDetais._id
                                                }},
                                                {new:true} ).populate("subSection").exec();

            //
            console.log(updateSection);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create sub Section, please try again",
            error:error.message
        });
    }
}


 