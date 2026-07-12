import { useEffect, useState } from "react";

import AllocationTable from "../../components/allocations/AllocationTable";

import AllocationModal from "../../components/allocations/AllocationModal";

import {
  getAllocations,
  createAllocation,
  returnAsset,
} from "../../services/allocationService";

const Allocations = () => {
  const [allocations, setAllocations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  // Fetch allocations

  const fetchAllocations = async () => {
    try {
      setLoading(true);

      const response = await getAllocations();

      setAllocations(response.allocations || []);
    } catch (error) {
      console.log("Allocation fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  // Create Allocation

  const handleCreate = async (form) => {
    try {
      await createAllocation(form);

      setOpenModal(false);

      fetchAllocations();
    } catch (error) {
      console.log("Allocation create error:", error);
    }
  };

  // Return Asset

  const handleReturn = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to return this asset?",
    );

    if (!confirm) return;

    try {
      await returnAsset(id);

      fetchAllocations();
    } catch (error) {
      console.log("Return error:", error);
    }
  };

  return (
    <div className="p-6">
      <div
        className="
            flex
            justify-between
            items-center
            mb-6
            "
      >
        <h1
          className="
            text-2xl
            font-bold
            "
        >
          Asset Allocation
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            "
        >
          + Allocate Asset
        </button>
      </div>

      {loading ? (
        <p>Loading allocations...</p>
      ) : (
        <AllocationTable allocations={allocations} onReturn={handleReturn} />
      )}

      <AllocationModal
        open={openModal}
        close={() => setOpenModal(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default Allocations;
