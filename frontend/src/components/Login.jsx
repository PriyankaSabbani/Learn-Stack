import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import {toast} from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/courses");
    }

    setFormData({
      email: "",
      password: ""
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

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      setFormData({
        email: "",
        password: ""
      });

      navigate("/courses");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );

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

            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit} autoComplete="off">

              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Enter email"
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

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup">Sign Up</Link>
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default Login;