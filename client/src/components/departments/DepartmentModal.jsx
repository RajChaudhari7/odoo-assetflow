import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createDepartment,
  updateDepartment,
} from "../../services/departmentService";

const DepartmentModal = ({
  open,
  onClose,
  fetchDepartments,
  department,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setName(department.name);
      setDescription(department.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Department name is required");
    }

    try {
      setLoading(true);

      if (department) {
        await updateDepartment(department._id, {
          name,
          description,
        });

        toast.success("Department updated successfully");
      } else {
        await createDepartment({
          name,
          description,
        });

        toast.success("Department created successfully");
      }

      fetchDepartments();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          {department ? "Edit Department" : "Add Department"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="block mb-2 font-medium">
              Department Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Department Name"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Description"
            />

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
            >
              {loading
                ? "Saving..."
                : department
                ? "Update"
                : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DepartmentModal;