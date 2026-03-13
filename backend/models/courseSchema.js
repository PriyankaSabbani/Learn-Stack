import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  videoUrl: {
    type: String,
    required: true
  }
});


const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  duration: {
    type: String
  },

  category: {
    type: String
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },

  thumbnail: {
    type: String
  },

  lessons: [lessonSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Course = mongoose.model("Course", courseSchema);

export default Course;