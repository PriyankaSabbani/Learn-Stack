import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import {toast} from "react-toastify";

function MyCourses() {

  const API = process.env.REACT_APP_API_URL;

  const [myCourses, setMyCourses] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  console.log(token);

  // Redirect to login if not logged in
  useEffect(() => {

    if (!token) {

      toast.error("Please login first!");

      navigate("/login");

    }

  }, [token, navigate]);

  // Fetch enrolled courses
  useEffect(() => {

    if (!token) return;

    axios
      .get(`${API}/api/enroll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setMyCourses(res.data))
      .catch((err) => {

        console.error("Enroll API error:", err.response || err);

        if (err.response?.status === 401) {

         toast.error("Session expired. Please login again.");

          localStorage.removeItem("token");

          navigate("/login");

        }

      });

  }, [token, navigate, API]);

  return (

    <div>

      <Navbar />

      <div className="container mt-5">

        {myCourses.length === 0 ? (

          <h3 className="text-center text-primary">

            {token
              ? "No courses enrolled yet!"
              : "Please login to see your courses."}

          </h3>

        ) : (

          <>

            <h2 className="text-primary mb-4">
              My Enrolled Courses
            </h2>

            <div className="row g-4">

              {myCourses.map((course) => (

                <div key={course._id} className="col-md-6 col-lg-4">

                  <div className="card h-100 shadow border-0">

                    <img
                      src={course.thumbnail}
                      className="card-img-top"
                      alt={course.title}
                      style={{
                        height: "180px",
                        objectFit: "cover"
                      }}
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
                        to={`/player/${course._id}`}
                        className="btn btn-success mt-2"
                      >
                        Start Learning
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default MyCourses;