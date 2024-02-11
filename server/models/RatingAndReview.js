const { Mongoose } = require("mongoose");

const RatingAndReview=Mongoose.Schema({

    user:{
        type:Mongoose.Schema.Type.ObjectId,
        require:true,
        ref:"User"
    },

    rating:{
        type:Number,
        required:true
    },

    review:{
        type:String,
        required:true
    }

})

module.exports=Mongoose.model("RatingANdReview",RatingAndReview);