import express from "express";

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();


// PUBLIC ROUTES
router.get("/", getCourses);
router.get("/:id", getCourseById);


// ADMIN ONLY ROUTES
router.post("/", adminAuth, createCourse);
router.put("/:id", adminAuth, updateCourse);
router.delete("/:id", adminAuth, deleteCourse);

export default router;