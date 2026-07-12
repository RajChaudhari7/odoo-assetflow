import StatsGrid from "../../components/dashboard/StatsGrid";

const Dashboard = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to AssetFlow ERP
        </p>

      </div>

      <StatsGrid />

    </div>
  );
};

export default Dashboard;