import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createCategory,
  updateCategory,
} from "../../services/categoryService";

const CategoryModal = ({
  open,
  onClose,
  fetchCategories,
  category,
}) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (category) {

      setName(category.name);
      setDescription(category.description);

    } else {

      setName("");
      setDescription("");

    }

  }, [category]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    try {

      setLoading(true);

      if (category) {

        await updateCategory(category._id, {
          name,
          description,
        });

        toast.success("Category updated successfully");

      } else {

        await createCategory({
          name,
          description,
        });

        toast.success("Category created successfully");

      }

      fetchCategories();
      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
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
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2 font-medium">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              placeholder="Enter Category Name"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              placeholder="Enter Description"
            />

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
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
                : category
                ? "Update"
                : "Create"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CategoryModal;