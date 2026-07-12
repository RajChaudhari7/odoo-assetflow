import { useEffect, useState } from "react";
import api from "../../services/api";

const MaintenanceAlerts = () => {

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaintenanceAssets = async () => {

    try {

      const { data } = await api.get(
        "/assets?status=Maintenance"
      );

      setAssets(data.assets);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchMaintenanceAssets();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-lg font-semibold mb-4">
        Maintenance Alerts
      </h2>

      {loading ? (

        <p>Loading...</p>

      ) : assets.length === 0 ? (

        <p className="text-gray-500">
          No Assets Under Maintenance
        </p>

      ) : (

        <div className="space-y-4">

          {assets.map((asset) => (

            <div
              key={asset._id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <h3 className="font-medium">
                  {asset.assetName}
                </h3>

                <p className="text-sm text-gray-500">
                  {asset.vendor}
                </p>

              </div>

              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">

                Maintenance

              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MaintenanceAlerts;