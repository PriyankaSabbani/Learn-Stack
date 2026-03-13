import Enrollment from "../models/enrollmentSchema.js";
import Course from "../models/courseSchema.js";

// POST /api/enroll/:courseId
export const enrollCourse = async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.params;

  try {
    // Check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) return res.status(400).json({ message: "You are already enrolled in this course" });

    // Enroll
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();

    res.json({ message: "Course enrolled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Enrollment failed" });
  }
};

// GET /api/enroll
export const getMyCourses = async (req, res) => {
  const userId = req.user._id;

  try {
    const enrollments = await Enrollment.find({ user: userId }).populate("course");
    const courses = enrollments.map((e) => e.course);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};