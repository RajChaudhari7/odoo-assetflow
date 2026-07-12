import { Bell, Search, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";


const Navbar = () => {


  const navigate = useNavigate();



  const handleLogout = () => {

    logoutUser();

    navigate("/login", {
      replace: true
    });

  };



  return (

    <header className="
      h-16 
      bg-white 
      border-b 
      border-gray-200 
      flex 
      items-center 
      justify-between 
      px-6
    ">


      {/* Search */}

      <div className="
        flex 
        items-center 
        gap-3 
        bg-gray-100 
        rounded-lg 
        px-4 
        py-2 
        w-80
      ">

        <Search
          size={18}
          className="text-gray-500"
        />


        <input

          type="text"

          placeholder="Search assets, employees..."

          className="
            bg-transparent 
            outline-none 
            w-full
          "

        />


      </div>







      {/* Right Section */}

      <div className="
        flex 
        items-center 
        gap-6
      ">



        {/* Notification */}

        <button className="relative">

          <Bell
            className="text-gray-600"
            size={22}
          />


          <span className="
            absolute 
            -top-1 
            -right-1 
            w-2 
            h-2 
            bg-red-500 
            rounded-full
          ">

          </span>


        </button>







        {/* User */}

        <div className="
          flex 
          items-center 
          gap-3
        ">


          <UserCircle

            size={36}

            className="text-emerald-600"

          />



          <div>


            <p className="
              text-xs 
              text-gray-500
            ">

              Asset Manager

            </p>


          </div>




        </div>








        {/* Logout Button */}

        <button

          onClick={handleLogout}

          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-lg
            text-red-600
            hover:bg-red-50
            transition
          "

        >

          <LogOut size={18}/>


          <span className="text-sm font-medium">

            Logout

          </span>


        </button>




      </div>


    </header>

  );

};


export default Navbar;