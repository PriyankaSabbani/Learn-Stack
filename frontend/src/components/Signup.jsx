import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import {toast} from "react-toastify";

function Signup() {

  const API = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/courses");
    }

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.post(
        `${API}/api/auth/register`,
        {
          fullName,
          email,
          password,
          confirmPassword
        }
      );

     toast.success(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/login");

    } catch (error) {

      toast.error(error.response?.data?.message || "Signup failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5" style={{ maxWidth: "500px" }}>

        <div className="card shadow">

          <div className="card-body">

            <h3 className="text-center mb-4">Create Account</h3>

            <form onSubmit={handleSubmit} autoComplete="off">

              <div className="mb-3">
                <label className="form-label">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Signup;