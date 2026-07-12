import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import api from "../../services/api";

const RecentActivities = () => {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {

    try {

      const { data } = await api.get("/dashboard/recent-allocations");

      setActivities(data.allocations);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-lg font-semibold mb-4">
        Recent Activities
      </h2>

      {loading ? (

        <p>Loading...</p>

      ) : activities.length === 0 ? (

        <p className="text-gray-500">
          No Recent Activities
        </p>

      ) : (

        <div className="space-y-4">

          {activities.map((activity) => (

            <div
              key={activity._id}
              className="flex items-start gap-3 border-b pb-3 last:border-b-0"
            >

              <div className="bg-emerald-100 p-2 rounded-full">

                <Activity
                  size={18}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-gray-700 font-medium">

                  {activity.asset?.assetName}

                  {" "}allocated to{" "}

                  {activity.employee?.fullName}

                </p>

                <p className="text-sm text-gray-500">

                  {new Date(
                    activity.allocationDate
                  ).toLocaleDateString()}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentActivities;