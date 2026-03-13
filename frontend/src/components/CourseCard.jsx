import React from "react";
import { Link } from "react-router-dom";


function CourseCard({ course }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card h-100 shadow border-0">

        <img
          src={course.thumbnail}
          className="card-img-top"
          alt="Course"
          style={{ height: "180px", objectFit: "contain" }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title fw-bold">
            {course.title}
          </h5>

          <p className="text-muted mb-1">
            <strong>{course.instructor}</strong>
          </p>

          <p className="card-text small flex-grow-1">
            {course.description}
          </p>

          <p className="text-primary fw-semibold">
            {course.duration}
          </p>

          <Link
            to={`/course/${course._id}`}
            className="btn btn-primary mt-auto"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
}

export default CourseCard;