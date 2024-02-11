const { Mongoose } = require("mongoose");

const categorySchema = Mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description:{
        type:String
    },

    course:{
        type:Mongoose.Schema.Type.ObjectId,
        ref:"Course",
    }

});

module.exports = Mongoose.model("category", categorySchema);