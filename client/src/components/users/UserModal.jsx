import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  registerEmployee,
  updateEmployee,
} from "../../services/userService";

import { getDepartments } from "../../services/departmentService";

const UserModal = ({
  open,
  onClose,
  fetchUsers,
  user,
}) => {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    employeeId: "",
    phone: "",
    department: "",
    role: "Employee",
    isActive: true,
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        password: "",
        employeeId: user.employeeId || "",
        phone: user.phone || "",
        department: user.department?._id || "",
        role: user.role || "Employee",
        isActive: user.isActive,
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        employeeId: "",
        phone: "",
        department: "",
        role: "Employee",
        isActive: true,
      });
    }
  }, [user]);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();

      setDepartments(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {user ? "Edit Employee" : "Add Employee"}
        </h2>

        <form className="grid grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          {!user && (

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          )}

          <div>

            <label className="block mb-2 font-medium">
              Employee ID
            </label>

            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="">
                Select Department
              </option>

              {departments.map((department) => (

                <option
                  key={department._id}
                  value={department._id}
                >
                  {department.name}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="Employee">
                Employee
              </option>

              <option value="Department Head">
                Department Head
              </option>

              <option value="Asset Manager">
                Asset Manager
              </option>

            </select>

          </div>

          {user && (

            <div className="col-span-2">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />

                Active Employee

              </label>

            </div>

          )}

                    <div className="col-span-2 flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              {loading
                ? "Please Wait..."
                : user
                ? "Update Employee"
                : "Add Employee"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.employeeId
    ) {
      return toast.error("Please fill all required fields");
    }

    if (!user && !formData.password) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);

      if (user) {

        await updateEmployee(user._id, {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
          isActive: formData.isActive,
        });

        toast.success("Employee Updated Successfully");

      } else {

        await registerEmployee({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          employeeId: formData.employeeId,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
        });

        toast.success("Employee Added Successfully");

      }

      fetchUsers();
      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }
};

export default UserModal;