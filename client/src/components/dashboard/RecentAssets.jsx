import { useEffect, useState } from "react";
import api from "../../services/api";

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700";

    case "Allocated":
      return "bg-blue-100 text-blue-700";

    case "Maintenance":
      return "bg-red-100 text-red-700";

    case "Retired":
      return "bg-gray-200 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentAssets = () => {

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {

    try {

      const { data } = await api.get("/dashboard/recent-assets");

      setAssets(data.assets);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">

      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">
          Recent Assets
        </h2>
      </div>

      {loading ? (
        <p className="p-6">Loading...</p>
      ) : (
        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="p-4">Asset</th>

              <th className="p-4">Category</th>

              <th className="p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {assets.map((asset) => (

              <tr key={asset._id} className="border-b hover:bg-gray-50">

                <td className="p-4">{asset.assetName}</td>

                <td className="p-4">
                  {asset.category?.name}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(asset.status)}`}
                  >
                    {asset.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default RecentAssets;