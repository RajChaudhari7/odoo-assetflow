import { useState } from "react";

import InputField from "../../components/forms/InputField";
import PasswordInput from "../../components/forms/PasswordInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-emerald-600">
          AssetFlow
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Asset Management ERP
        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;