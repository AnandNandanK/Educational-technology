const { Mongoose } = require("mongoose");

const courseProgress=Mongoose.Schema({

    courseId:
    {
     type:Mongoose.Schema.Type.ObjectId,
     ref:"Course"
    },

    completedVideos:{
        type:Mongoose.Schema.Type.ObjectId,
        ref:"Subscription",
    }



})

module.exports=Mongoose.model("courseProgress",courseProgress);