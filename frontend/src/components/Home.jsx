import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import axios from "axios";
import {toast} from "react-toastify";

function Home() {

  const API = process.env.REACT_APP_API_URL;

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`${API}/api/courses`)
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching courses:", err);
        setLoading(false);
      });

  }, [API]);

  const handleSearch = (searchTerm) => {

    if (!searchTerm) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCourses(filtered);

  };

  const handleFilter = ({ category, level }) => {

    let filtered = [...courses];

    if (category && category !== "All") {
      filtered = filtered.filter(
        (course) => course.category === category
      );
    }

    if (level && level !== "All") {
      filtered = filtered.filter(
        (course) => course.level === level
      );
    }

    setFilteredCourses(filtered);

  };

  return (

    <div>

      <Navbar
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      <div className="container mt-5">

        {loading ? (
          <h4 className="text-center">
            Loading Courses...
          </h4>
        ) : (
          <div className="row g-4">

            {filteredCourses.map((course) => (

              <CourseCard
                key={course._id}
                course={course}
              />

            ))}

          </div>
        )}

      </div>

    </div>

  );

}

export default Home;