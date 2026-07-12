import { NavLink } from "react-router-dom";
import { sidebarMenu } from "../../utils/sidebarMenu.js";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
const Sidebar = () => {



  const navigate = useNavigate();


  const handleLogout = () => {

    logoutUser();

    navigate("/login");

  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-emerald-600">
          AssetFlow
        </h1>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">

        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-emerald-500 text-white shadow"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default Sidebar;