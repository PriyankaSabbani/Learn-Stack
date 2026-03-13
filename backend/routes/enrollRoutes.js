import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth
import { enrollCourse, getMyCourses } from "../controllers/enrollController.js";

const router = express.Router();

// Enroll in course
router.post("/:courseId", protect, enrollCourse);

// Get my courses
router.get("/", protect, getMyCourses);

export default router;