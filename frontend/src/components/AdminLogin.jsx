import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import {toast} from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      toast.error("Logout from user account to access Admin Login");
      navigate("/courses");
    }

    if (adminToken) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/admin/login`, { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminLoggedIn", "true");
      toast.success("Admin Login Successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Admin Credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="col-md-4 mx-auto" autoComplete="off">
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;