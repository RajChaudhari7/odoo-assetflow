import Sidebar from "../../components/layout/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to AssetFlow
        </p>
      </div>
    </div>
  );
};

export default Dashboard;