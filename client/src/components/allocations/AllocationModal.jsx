import { useEffect, useState } from "react";

import { getAssets } from "../../services/assetService";

import { getEmployees } from "../../services/employeeService";

const AllocationModal = ({ open, close, onSubmit }) => {
  const [assets, setAssets] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    asset: "",
    employee: "",
    expectedReturnDate: "",
    remarks: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const assetResponse = await getAssets({
          status: "Available",
        });

        const employeeResponse = await getEmployees();

        console.log("Available Assets", assetResponse);

        console.log("Employees", employeeResponse);

        setAssets(assetResponse.assets || []);

        setEmployees(employeeResponse.users || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (open) {
      loadData();
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div
      className="
fixed inset-0
bg-black/40
flex items-center
justify-center
z-50
"
    >
      <form
        onSubmit={submit}
        className="
bg-white
p-6
rounded-xl
w-[500px]
space-y-4
"
      >
        <h2 className="text-xl font-bold">Allocate Asset</h2>

        <select
          name="asset"
          value={form.asset}
          onChange={handleChange}
          className="
border
p-2
w-full
"
        >
          <option value="">Select Asset</option>

          {assets.map((asset) => (
            <option key={asset._id} value={asset._id}>
              {asset.assetName}-{asset.assetId}
            </option>
          ))}
        </select>

        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          className="
border
p-2
w-full
"
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.fullName}-{emp.employeeId}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="expectedReturnDate"
          value={form.expectedReturnDate}
          onChange={handleChange}
          className="
border
p-2
w-full
"
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
          className="
border
p-2
w-full
"
        />

        <button
          className="
bg-blue-600
text-white
px-4
py-2
rounded
"
        >
          Allocate
        </button>

        <button type="button" onClick={close} className="ml-3">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AllocationModal;
