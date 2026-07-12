import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;