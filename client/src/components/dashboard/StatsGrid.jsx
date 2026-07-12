import {
  Boxes,
  Users,
  Building2,
  CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Assets"
        value="152"
        icon={Boxes}
        color="bg-emerald-500"
      />

      <StatCard
        title="Employees"
        value="28"
        icon={Users}
        color="bg-blue-500"
      />

      <StatCard
        title="Departments"
        value="6"
        icon={Building2}
        color="bg-orange-500"
      />

      <StatCard
        title="Bookings"
        value="19"
        icon={CalendarDays}
        color="bg-purple-500"
      />

    </div>
  );
};

export default StatsGrid;