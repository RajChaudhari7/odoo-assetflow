import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getEmployees,
  deleteEmployee,
} from "../../services/userService";

import UserModal from "../../components/users/UserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getEmployees();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);

      toast.success("Employee Deleted");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <p className="text-gray-500">
            Manage all employees
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Employee
        </button>

      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {user.fullName}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.department?.name || "-"}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>

                </td>

                <td className="p-4 flex justify-center gap-2">

                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchUsers={fetchUsers}
        user={selectedUser}
      />

    </div>
  );
};

export default Users;