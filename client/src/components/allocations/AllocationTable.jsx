const AllocationTable = ({ allocations, onReturn }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Asset</th>

            <th className="p-3 text-left">Employee</th>

            <th className="p-3 text-left">Allocation Date</th>

            <th className="p-3 text-left">Expected Return</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {allocations.map((allocation) => (
            <tr key={allocation._id} className="border-b">
              <td className="p-3">
                {allocation.asset?.assetName}

                <br />

                <span className="text-gray-500">
                  {allocation.asset?.assetId}
                </span>
              </td>

              <td className="p-3">
                {allocation.employee?.fullName}

                <br />

                <span className="text-gray-500">
                  {allocation.employee?.employeeId}
                </span>
              </td>

              <td className="p-3">
                {new Date(allocation.allocationDate).toLocaleDateString()}
              </td>

              <td className="p-3">
                {allocation.expectedReturnDate
                  ? new Date(allocation.expectedReturnDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-3">
                <span
                  className="
px-3 py-1
rounded-full
bg-blue-100
text-blue-700
"
                >
                  {allocation.status}
                </span>
              </td>

              <td className="p-3">
                {allocation.status === "Allocated" && (
                  <button
                    onClick={() => onReturn(allocation._id)}
                    className="
bg-red-500
text-white
px-3 py-1
rounded
"
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocationTable;
