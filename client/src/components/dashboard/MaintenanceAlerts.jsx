const maintenanceData = [
  {
    id: 1,
    asset: "Dell Latitude 5420",
    dueDate: "15 Jul 2026",
    priority: "High",
  },
  {
    id: 2,
    asset: "HP LaserJet Pro",
    dueDate: "18 Jul 2026",
    priority: "Medium",
  },
  {
    id: 3,
    asset: "Epson Projector",
    dueDate: "22 Jul 2026",
    priority: "Low",
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-600 bg-red-100";

    case "Medium":
      return "text-orange-600 bg-orange-100";

    case "Low":
      return "text-green-600 bg-green-100";

    default:
      return "text-gray-600 bg-gray-100";
  }
};

const MaintenanceAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-lg font-semibold mb-4">
        Maintenance Alerts
      </h2>

      <div className="space-y-4">

        {maintenanceData.map((item) => (

          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>

              <h3 className="font-medium">
                {item.asset}
              </h3>

              <p className="text-sm text-gray-500">
                Due: {item.dueDate}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}
            >
              {item.priority}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MaintenanceAlerts;