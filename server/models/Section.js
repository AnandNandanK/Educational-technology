const { Mongoose } = require("mongoose");
const Subsection = require("./Subsection");

const sectionSchema=Mongoose.Schema({

  sectionName:{
    type:String
  },

  subSection:[
    {
        type:Mongoose.Schema.Type.ObjectId,
        require:true,
        ref:"SubSection"
    }
  ]
  
 


})

module.exports=Mongoose.model("Section",sectionSchema);