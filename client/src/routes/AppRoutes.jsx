import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route element={<AuthLayout />}>

          <Route path="/" element={<Login />} />

        </Route>

        {/* Dashboard */}

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;