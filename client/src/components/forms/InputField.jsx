const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
};

export default InputField;