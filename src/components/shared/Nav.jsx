import React, { useContext, useState } from "react";

// react icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { TbLogout2, TbUsersGroup } from "react-icons/tb";
import { CiMenuFries, CiDark } from "react-icons/ci";
import {
  MdLaptopMac,
  MdOutlineArrowRightAlt,
  MdOutlineKeyboardArrowRight,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import { BsBuildings, BsCalendar2Date } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../providers/ThemeProvider";

const Nav = ({ links, companyPhoto, handleSignOut, user, currentUser }) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMegaMenuCollapse, setIsMegaMenuCollapse] = useState(false);
  const [megaMenuSubItemsOpen, setMegaMenuSubItemsOpen] = useState("");
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <nav className="flex items-center justify-between relative px-4 md:px-4 max-w-screen-xl mx-auto py-4">
      {/* logo */}
      <Link to="/">
        {user ? (
          currentUser?.role === "hr" && currentUser?.companyPhoto ? (
            <img
              className="w-32 h-10 overflow-hidden rounded-md"
              src={currentUser.companyPhoto}
              alt="hr_company_logo"
            />
          ) : currentUser?.role === "employee" &&
            currentUser?.affiliatedWith &&
            companyPhoto ? (
            <img
              className="w-32 h-10 overflow-hidden rounded-md"
              src={companyPhoto}
              alt="employee_affiliated_company_logo"
            />
          ) : (
            <img
              className="w-32 object-contain rounded-md"
              src="./assetwise.jpg"
              alt="default_company_logo"
            />
          )
        ) : (
          <img
            className="w-32 object-contain rounded-md"
            src="./assetwise.jpg"
            alt="default_company_logo"
          />
        )}
      </Link>

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        {/* product megamenu */}
        {links}
      </ul>

      {/* user account */}
      <div className="flex items-center gap-[15px]">
        {user && user?.email ? (
          <div
            className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            <div className="relative">
              <img
                src={user && user?.email ? user?.photoURL : "avatar"}
                alt="avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              {/* <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div> */}
            </div>

            <h1 className="text-[1rem] font-[400] text-gray-600 lg:block hidden">
              {user && user?.email ? user?.displayName : ""}
            </h1>

            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
            >
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <RxDashboard />
                Dashboard
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>
              <p
                onClick={toggleTheme}
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50"
              >
                {theme === "light" ? (
                  <>
                    <MdOutlineDarkMode /> Dark Mode
                  </>
                ) : (
                  <>
                    <MdOutlineLightMode /> Light Mode
                  </>
                )}
              </p>

              <div className="mt-3 border-t border-gray-200 pt-[5px]">
                <p
                  onClick={handleSignOut}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </p>
              </div>
            </div>

            <IoIosArrowUp
              className={`${
                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
              } transition-all duration-300 text-gray-600 lg:block hidden`}
            />
          </div>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </Link>
        )}

        <CiMenuFries
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex"
        />
      </div>

      {/* mobile sidebar */}
      <aside
        className={`${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-0 opacity-0 z-[-1]"
        } md:hidden bg-white p-4 text-center absolute top-[55px] right-0 sm:w-[300px] rounded-md transition-all duration-300`}
      >
        <ul
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col"
        >
          {links}
        </ul>
      </aside>
    </nav>
  );
};

export default Nav;
