import { useEffect, useState } from "react";
import {
  Boxes,
  Users,
  Building2,
  FolderKanban,
} from "lucide-react";

import api from "../../services/api";
import StatCard from "./StatCard";

const StatsGrid = () => {

  const [stats, setStats] = useState({
    totalAssets: 0,
    totalUsers: 0,
    totalDepartments: 0,
    totalCategories: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/dashboard/stats");
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Assets"
        value={stats.totalAssets}
        icon={Boxes}
        color="bg-emerald-500"
      />

      <StatCard
        title="Employees"
        value={stats.totalUsers}
        icon={Users}
        color="bg-blue-500"
      />

      <StatCard
        title="Departments"
        value={stats.totalDepartments}
        icon={Building2}
        color="bg-orange-500"
      />

      <StatCard
        title="Categories"
        value={stats.totalCategories}
        icon={FolderKanban}
        color="bg-purple-500"
      />

    </div>
  );
};

export default StatsGrid;