import React from "react";
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify";

function AdminDashboardRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    toast.error("Admin login required");
    return <Navigate to="/admin-login" replace />;
  }

  return children; // show dashboard
}

export default AdminDashboardRoute;