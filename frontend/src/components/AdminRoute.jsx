import React from "react";
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify";

function AdminRoute({ children }) {
  const userToken = localStorage.getItem("token"); // normal user
  const adminToken = localStorage.getItem("adminToken"); // admin

  // Normal user logged in → block access
  if (userToken) {
    toast.error("Logout from user account to access Admin Login");
    return <Navigate to="/courses" replace />;
  }

  // Admin already logged in → redirect to dashboard
  if (adminToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children; // show admin login page
}

export default AdminRoute;