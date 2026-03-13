import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Main from "./components/Main";
import CourseDetailsPage from "./components/CourseDetailsPage";
import MyCourses from "./components/MyCourses";
import CoursePlayer from "./components/CoursePlayer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

import AdminLoginRoute from "./components/AdminLoginRoute";
import AdminDashboardRoute from "./components/AdminDashboardRoute";

function App() {
  return (
    <>
    <ToastContainer  position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "10px",
          padding: "12px"
        }}></ToastContainer>
    <div className="App">
      <Router>

        <Routes>

          {/* MAIN */}
          <Route path="/" element={<Main />} />
          <Route path="/courses" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />

          {/* USER PROTECTED */}
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />

          <Route path="/player/:id" element={<CoursePlayer />} />

          {/* USER AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ADMIN LOGIN PROTECTION */}
          <Route
            path="/admin-login"
            element={
              <AdminLoginRoute>
                <AdminLogin />
              </AdminLoginRoute>
            }
          />

          {/* ADMIN DASHBOARD PROTECTION */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboardRoute>
                <AdminDashboard />
              </AdminDashboardRoute>
            }
          />

        </Routes>

      </Router>

    </div>
    </>
  );
}

export default App;