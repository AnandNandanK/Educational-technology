const { Mongoose } = require("mongoose");

const courseSchema = Mongoose.Schema({

  courseName: {
    type: String,
    trim: true,
    require: true
  },

  courseDescription: {
    type: String,
    type: true,
    trim: true
  },

  instructor: [
    {
      type: Mongoose.Schema.Type.ObjectId,
      ref: "User",
      require: true
    }
  ],

  whatYouWillLearn: {
    type: String
  },

  courseContent: [ //ALL SECTION
    {
      type: Mongoose.Schema.Type.ObjectId,
      ref: "Section"
    }
  ],

  ratingAndReviews: [
    {
      type: Mongoose.Schema.Type.ObjectId,
      ref: "RaringAndReview",
    }
  ],

  price: {
    type: Number,

  },

  thumbnail: {
    type: String
  },

  category: {
    type: Mongoose.Schema.Type.ObjectId,
    ref: "Tag"
  },
  tag: {
    type: String,
    ref: "Tag"
  },

  studentEnrolled: [{
    type: Mongoose.Schema.Type.ObjectId,
    required: true,
    ref: "User"
  }]



})

module.exports = Mongoose.model("Course", courseSchema);
