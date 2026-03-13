import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function AdminDashboard() {

  const navigate = useNavigate();

  const API = `${process.env.REACT_APP_API_URL}/api/courses`;

  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    category: "",
    level: "",
    thumbnail: "",
    lessons: [{ title: "", videoUrl: "" }]
  });

  const [editId, setEditId] = useState(null);

  /* ---------------- SECURITY CHECK ---------------- */

  useEffect(() => {

    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");

    if (userToken) {
      toast.error("Logout from user account to access Admin Dashboard");
      navigate("/courses");
      return;
    }

    if (!adminToken) {
      navigate("/admin-login");
      return;
    }

    fetchCourses(adminToken);
  }, [navigate]);

  /* -------- WATCH ADMIN LOGOUT -------- */

  useEffect(() => {

    const checkAdmin = () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        navigate("/admin-login");
      }
    };

    const interval = setInterval(checkAdmin, 500);

    return () => clearInterval(interval);

  }, [navigate]);

  /* ---------------- FETCH COURSES ---------------- */

  const fetchCourses = async (adminToken) => {

    try {

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });

      setCourses(res.data);

    } catch (error) {
     toast.error("Failed to fetch courses");

    }

  };

  /* ---------------- FORM HANDLERS ---------------- */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleLessonChange = (index, field, value) => {

    const updatedLessons = [...formData.lessons];

    updatedLessons[index][field] = value;

    setFormData({
      ...formData,
      lessons: updatedLessons
    });

  };

  const addLesson = () => {

    setFormData({
      ...formData,
      lessons: [
        ...formData.lessons,
        { title: "", videoUrl: "" }
      ]
    });

  };

  const removeLesson = (index) => {

    const updatedLessons = [...formData.lessons];

    updatedLessons.splice(index, 1);

    setFormData({
      ...formData,
      lessons: updatedLessons
    });

  };

  /* ---------------- ADD / UPDATE COURSE ---------------- */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const adminToken = localStorage.getItem("adminToken");

    try {

      if (editId) {

        await axios.put(
          `${API}/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`
            }
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          API,
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`
            }
          }
        );

      }

      setFormData({
        title: "",
        description: "",
        instructor: "",
        duration: "",
        category: "",
        level: "",
        thumbnail: "",
        lessons: [{ title: "", videoUrl: "" }]
      });

      fetchCourses(adminToken);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Operation failed"
      );

    }

  };

  /* ---------------- DELETE COURSE ---------------- */

  const deleteCourse = async (id) => {

    const adminToken = localStorage.getItem("adminToken");

    const confirmDelete = window.confirm("Delete this course?");

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );

      fetchCourses(adminToken);

    } catch {
      toast.error("Delete failed");
    }

  };

  /* ---------------- EDIT COURSE ---------------- */

  const editCourse = (course) => {

    setFormData(course);

    setEditId(course._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  return (

    <div>

      <Navbar />

      <div className="container mt-5">

        <h2 className="text-primary mb-4">
          Admin Dashboard
        </h2>

        {/* COURSE FORM */}

        <form onSubmit={handleSubmit} className="mb-5">

          <div className="row g-3">

            <div className="col-md-6">
              <input
                className="form-control"
                name="title"
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                name="instructor"
                placeholder="Instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                name="level"
                placeholder="Level"
                value={formData.level}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* LESSONS */}

            <div className="col-12">

              <h5>Lessons</h5>

              {formData.lessons.map((lesson, index) => (

                <div key={index} className="row mb-2">

                  <div className="col-md-5">
                    <input
                      className="form-control"
                      placeholder="Lesson Title"
                      value={lesson.title}
                      onChange={(e) =>
                        handleLessonChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-5">
                    <input
                      className="form-control"
                      placeholder="YouTube Video URL"
                      value={lesson.videoUrl}
                      onChange={(e) =>
                        handleLessonChange(
                          index,
                          "videoUrl",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeLesson(index)}
                    >
                      Remove
                    </button>
                  </div>

                </div>

              ))}

              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={addLesson}
              >
                Add Lesson
              </button>

            </div>

            <div className="col-12">

              <button className="btn btn-success">
                {editId ? "Update Course" : "Add Course"}
              </button>

            </div>

          </div>

        </form>

        {/* COURSE TABLE */}

        <table className="table table-bordered">

          <thead className="table-dark">

            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr key={course._id}>

                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.category}</td>
                <td>{course.level}</td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => editCourse(course)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminDashboard;