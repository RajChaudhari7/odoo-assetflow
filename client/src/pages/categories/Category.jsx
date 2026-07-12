import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCategories,
  deleteCategory,
} from "../../services/categoryService";
import CategoryModal from "../../components/categories/CategoryModal";

const Category = () => {

  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {

      const data = await getCategories();

      setCategories(data.categories);

    } catch (error) {

      console.log(error);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {

      await deleteCategory(id);

      toast.success("Category deleted successfully");

      fetchCategories();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete category"
      );

    }

  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Asset Categories
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setOpenModal(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Category
        </button>

      </div>

      <div className="space-y-4">

        {
          categories.length === 0 ? (

            <p className="text-gray-500">
              No Categories Found
            </p>

          ) : (

            categories.map((category) => (

              <div
                key={category._id}
                className="bg-white rounded-lg shadow-sm border p-5 flex justify-between items-center"
              >

                <div>

                  <h2 className="font-semibold text-lg">
                    {category.name}
                  </h2>

                  <p className="text-gray-500">
                    {category.description}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(category._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )
        }

      </div>

      <CategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchCategories={fetchCategories}
        category={selectedCategory}
      />

    </div>
  );
};

export default Category;