import { Bell, Search, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2 w-80">

        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search assets, employees..."
          className="bg-transparent outline-none w-full"
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell className="text-gray-600" size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">

          <UserCircle
            size={36}
            className="text-emerald-600"
          />

          <div>
            <h4 className="font-semibold text-gray-700">
              Aksha
            </h4>

            <p className="text-xs text-gray-500">
              Asset Manager
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;