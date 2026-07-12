const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className={`p-4 rounded-full ${color}`}>
          <Icon size={28} className="text-white" />
        </div>

      </div>

    </div>
  );
};

export default StatCard;