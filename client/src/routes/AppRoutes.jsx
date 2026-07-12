import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Category from "../pages/categories/Category";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Department from "../pages/department/Departments";
import Users from "../pages/users/Users";

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

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/departments"
              element={<Department />}
            />

            <Route
              path="/categories"
              element={<Category />}
            />

            <Route
              path="/employees"
              element={<Users />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;