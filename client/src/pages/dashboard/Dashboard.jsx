import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentAssets from "../../components/dashboard/RecentAssets";
import RecentActivities from "../../components/dashboard/RecentActivities";
import MaintenanceAlerts from "../../components/dashboard/MaintenanceAlerts";

const Dashboard = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to AssetFlow ERP
        </p>

      </div>

      <StatsGrid />

      <RecentAssets />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <RecentActivities />

        <MaintenanceAlerts />

      </div>

    </div>
  );
};

export default Dashboard;