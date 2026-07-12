import { useEffect, useState } from "react";
import { getDepartments } from "../../services/departmentService";

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = async () => {
  try {
    const data = await getDepartments();

    console.log(data);

    setDepartments(data.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
  <div>

    {/* Header */}
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all departments
        </p>
      </div>

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg">
        + Add Department
      </button>

    </div>

    {/* Department List */}
    <div className="mt-6 space-y-4">
      {departments.length === 0 ? (
        <p className="text-gray-500">No departments found.</p>
      ) : (
        departments.map((department) => (
          <div
            key={department._id}
            className="bg-white border rounded-lg shadow-sm p-4"
          >
            <h2 className="text-lg font-semibold">
              {department.name}
            </h2>

            <p className="text-gray-500">
              {department.description}
            </p>
          </div>
        ))
      )}
    </div>

  </div>
);
};

export default Department;