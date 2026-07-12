import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { deleteDepartment } from "../../services/departmentService";

import { getDepartments } from "../../services/departmentService";
import DepartmentModal from "../../components/departments/DepartmentModal";

const Department = () => {

  const [departments, setDepartments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {

      const data = await getDepartments();

      setDepartments(data.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDepartment(id);

      toast.success("Department deleted successfully");

      fetchDepartments();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to delete department"
      );

    }

  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Departments
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all departments
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedDepartment(null);
            setOpenModal(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Department
        </button>

      </div>

      <div className="space-y-4">

        {
          departments.length === 0 ? (

            <p className="text-gray-500">
              No departments found.
            </p>

          ) : (

            departments.map((department) => (

              <div
                key={department._id}
                className="bg-white border rounded-lg shadow-sm p-5 flex justify-between items-center"
              >

                <div>

                  <h2 className="text-lg font-semibold">
                    {department.name}
                  </h2>

                  <p className="text-gray-500">
                    {department.description}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedDepartment(department);
                      setOpenModal(true);
                    }}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(department._id)}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )
        }

      </div>

      <DepartmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchDepartments={fetchDepartments}
        department={selectedDepartment}
      />

    </div>
  );
};

export default Department;