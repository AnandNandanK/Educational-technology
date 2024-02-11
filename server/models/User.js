const { Mongoose } = require("mongoose");


const userSchema=Mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    
    lastName:{
        type:String,
        require:true,
        trim:true
    },

    password:{
        type:String,
        require:true,
    },

    accountType:{
        require:true,
        enum:["Admin","Student","Instructor"]
    },

    additionalDetails:[
        {
            type:Mongoose.Schema.Type.ObjectId,
            require:true,
            ref:"Profile",
        }
    ],
    
    course:[
        {
            type:Mongoose.Schema.Type.ObjectId,
             ref:"Course"
        }
        
    ],
 
    image:{
        type:String,
        require:true
    },

    token:{
        type:String
    },

    resetPasswordExpires:{
        type:Date
    },

    courseProgress:[
        {
            type:Mongoose.Schema.Type.ObjectId,
            ref:"CourseProgress"
        }
        
    ],



})

module.exports=Mongoose.model("User",userSchema);