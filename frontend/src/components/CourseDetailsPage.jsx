import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import {toast} from "react-toastify";

function CourseDetailsPage() {

  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;

  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch course details
  useEffect(() => {

    axios
      .get(`${API}/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

  }, [id, API]);

  // Check if already enrolled
  useEffect(() => {

    if (!token) return;

    axios
      .get(`${API}/api/enroll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {

        const alreadyEnrolled =
          res.data.some((c) => c._id === id);

        setEnrolled(alreadyEnrolled);

      })
      .catch((err) => console.error(err));

  }, [id, token, API]);

  const enrollCourse = async () => {

    if (!token)
      return toast.error("Please login to enroll in this course.");

    if (enrolled) {
      toast.error("You are already enrolled in this course");
      return;
    }

    try {

      const res = await axios.post(
        `${API}/api/enroll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(res.data.message);

      setEnrolled(true);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Enrollment failed"
      );

    }

  };

  if (!course)
    return <h2 className="text-center mt-5">Loading...</h2>;

  return (

    <div>

      <Navbar />

      <div className="container my-5">

        <div className="row align-items-center">

          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">

            <img
              src={course.thumbnail}
              alt={course.title}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain"
              }}
            />

          </div>

          <div className="col-lg-6 col-md-12">

            <h1 className="fw-bold mb-3">
              {course.title}
            </h1>

            <p className="text-muted mb-2">
              Instructor:
              <strong> {course.instructor}</strong>
            </p>

            <div className="mb-3">

              <span className="badge bg-primary me-2 py-2 px-3 fs-6">
                {course.duration}
              </span>

              <span className="badge bg-primary me-2 py-2 px-3 fs-6">
                {course.level}
              </span>

              <span className="badge bg-primary py-2 px-3 fs-6">
                {course.category}
              </span>

            </div>

            <p className="mb-4">
              {course.description}
            </p>

            <button
              className="btn btn-success btn-lg px-4 py-2"
              onClick={enrollCourse}
            >
              {enrolled
                ? "Already Enrolled"
                : "Enroll Now"}
            </button>

          </div>

        </div>

      </div>

      <div className="container mb-5">

        <h3 className="mb-3">
          Lessons ({course.lessons.length})
        </h3>

        <ul className="list-group">

          {course.lessons.map((lesson, idx) => (

            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >

              {lesson.title}

              <span className="badge bg-primary rounded-pill">
                {idx + 1}
              </span>

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default CourseDetailsPage;