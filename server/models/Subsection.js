const { Mongoose } = require("mongoose");

const subSection=Mongoose.Schema({

  title:{
    type:String
  },

  timeDuration:{
    type:String
  },

  description:{
    type:String
  },

  videoUrl:{
    type:String
  }
    


})

module.exports=Mongoose.model("subSection",subSection);