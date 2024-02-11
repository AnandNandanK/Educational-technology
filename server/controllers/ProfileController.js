const Profile =require ("../models/Profile");
const User =require ("../models/User");


exports.updateProfile = async (req,res)=>{
    try{
        //get Data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get UserId

        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are requred "
            });
        }


        //find profile 
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetais;
        const profileDetails=await Profile.findById(profileId);

        //update Profile
        profileDetails.dateOfBirth=dateOfBirth;//EXPLANATION :||=>  // object mein kuch badlav karte hain jo database se liya gaya hai, to wo badlav database mein bhi dikhai dega. Yani agar aap profileDetails ke guno mein kuch badlav karte hain, to wo badlav database mein bhi save ho jayega bina kisi aur function ko call kiye. 
                                                //Mongoose mein, jab aap kisi document ko database se retrieve karte hain, to us document ke changes automatically track kiye jaate hain. Isliye agar aap seedhe profileDetails ke properties ko modify karte hain, to ye badlav database mein automatically save ho jayega.
        profileDetails.about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save(); //YE BAAD ME SAMAJH LENA SAVE PROFILE KARNA CHAHIYE HAM PROFILEDTAILS SAVE KR RAHE HAI

        return res.status(200).json({
            success:true,
            message:"profile Updated Successfully",
            profileDetails
        })

         
    }
    catch(error){

         return res.status(500).json({
            success:false,
            message:"profile NOT Updated",
          
        })
    }
}

//DELETE Account
//Explore -> h ow can we schedule this delete 

exports.deleteAccount=async(req,res)=>{
    try {
        //Get id 
        const id = req.user.id //FROM DECODE MIDDELWARE
        
        //Validation 
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"USer NOt found"
            })
        }

        // Delete Profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetais});// _id aur userDetaisl.addtionalDetais kya cheej hai 
        //TODO: HW unenroll user from all enrolled course
        
        //Delete User
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
            profileDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User NOt Deleted",
          
        })
    }
}

//Get All user
exports.getAllUserDetails=async()=>{
    try {
        //Get id
        const id=req.user.id;

        //Validation and get user details
        const userDetails=await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"User Data fetched Successfully"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}