import { Activity } from "lucide-react";

const activities = [
  {
    id: 1,
    message: "Raj added a new asset",
    time: "10 min ago",
  },
  {
    id: 2,
    message: "Aksha allocated Dell Laptop",
    time: "30 min ago",
  },
  {
    id: 3,
    message: "Printer sent for maintenance",
    time: "1 hour ago",
  },
  {
    id: 4,
    message: "New employee registered",
    time: "2 hours ago",
  },
];

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 border-b pb-3 last:border-b-0"
          >
            <div className="bg-emerald-100 p-2 rounded-full">
              <Activity size={18} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-gray-700 font-medium">
                {activity.message}
              </p>

              <p className="text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;