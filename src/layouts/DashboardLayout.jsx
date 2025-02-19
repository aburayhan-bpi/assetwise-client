import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChartBar,
  FaBell,
} from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import useCurrentUser from "../hooks/useCurrentUser";
import { ThemeContext } from "../providers/ThemeProvider";
import { IoIosArrowUp } from "react-icons/io";

import { TbLogout2 } from "react-icons/tb";
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineQueryStats,
} from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { RiFunctionAddLine } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import "./DashboardLayout.css";
const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  //   For Profile
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  //   Sidebar and others
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Toggle sidebar when clicking the menu button
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking a menu item
  const handleItemClick = () => {
    setIsSidebarOpen(false);
  };
  const handleSignOut = () => {
    logOut().then(() => {
      // console.log("sign out done");
      toast.success("Logged Out!");
      navigate("/");
    });
  };

  return (
    <div className="relative">
      <div className="flex h-screen  w-full">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`overflow-hidden bg-blue-100 text-black dark:bg-blue-950 dark:text-[#FFAB5B] w-52 py-5 space-y-6 fixed top-0 inset-y-0 left-0 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative lg:block z-50`}
        >
          <h2 className="text-2xl px-5 font-bold">Dashboard</h2>
          <nav>
            {/* Routes For Employee */}
            {user?.email && currentUser?.role === "employee" && (
              <ul className="space-y-4">
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard"
                    className="flex items-center space-x-3"
                    end
                  >
                    <MdOutlineQueryStats className="text-lg" />
                    <span>Overview</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink to="/" className="flex items-center space-x-3">
                    <GoHome className="text-lg" /> <span>Home</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/emp-assets"
                    className="flex items-center space-x-3"
                  >
                    <AiOutlineProduct className="text-lg" />
                    <span>Assets</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/emp-team"
                    className="flex items-center space-x-3"
                  >
                    <RiFunctionAddLine className="text-lg" />{" "}
                    <span>My Team</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/request-asset"
                    className="flex items-center space-x-3"
                  >
                    <VscGitPullRequestNewChanges className="text-lg" />{" "}
                    <span>Request Asset</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center space-x-3"
                  >
                    <CgProfile className="text-lg" /> <span>Profile</span>
                  </NavLink>
                </li>
              </ul>
            )}
            {/* Routes For HR */}
            {user?.email && currentUser?.role === "hr" && (
              <ul className="space-y-4">
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard"
                    className="flex items-center space-x-3"
                    end
                  >
                    <MdOutlineQueryStats className="text-lg" />
                    <span>Overview</span>
                  </NavLink>
                </li>

                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink to="/" className="flex items-center space-x-3">
                    <GoHome className="text-lg" /> <span>Home</span>
                  </NavLink>
                </li>

                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/assets"
                    className="flex items-center space-x-3"
                  >
                    <AiOutlineProduct className="text-lg" />
                    <span>Assets</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/add-assets"
                    className="flex items-center space-x-3"
                  >
                    <RiFunctionAddLine className="text-lg" />{" "}
                    <span>Add Assets</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/all-requests"
                    className="flex items-center space-x-3"
                  >
                    <VscGitPullRequestNewChanges className="text-lg" />{" "}
                    <span>All Requests</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/employees"
                    className="flex items-center space-x-3"
                  >
                    <HiOutlineUserGroup className="text-lg" />{" "}
                    <span>Employees</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/add-employees"
                    className="flex items-center space-x-3"
                  >
                    <HiOutlineUserPlus className="text-lg" />{" "}
                    <span>Add Employees</span>
                  </NavLink>
                </li>
                <li
                  className="flex items-center space-x-3 py-2 px-6 hover:bg-blue-200 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={handleItemClick}
                >
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center space-x-3"
                  >
                    <CgProfile className="text-lg" /> <span>Profile</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col dark:bg-black">
          {/* Top Bar */}
          <div className="sticky top-0 z-50 bg-white dark:bg-blue-900 dark:text-white shadow-md p-4 flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="text-blue-900 text-xl lg:hidden"
            >
              <FaBars />
            </button>
            <h2 className="text-xl font-semibold">
              Welcome, {user?.displayName}
            </h2>
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

              <h1 className="text-[1rem] font-[400] text-gray-600 dark:text-white lg:block hidden">
                {user && user?.email ? user?.displayName : ""}
              </h1>

              <div
                className={`${
                  accountMenuOpen
                    ? "translate-y-0 opacity-100 z-[1] "
                    : "translate-y-[10px] opacity-0 z-[-1] hidden"
                } bg-white dark:bg-blue-950 w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
              >
                <Link to="/dashboard">
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:hover:bg-gray-900 dark:text-white text-gray-600 hover:bg-gray-50">
                    <RxDashboard />
                    Dashboard
                  </p>
                </Link>
                <Link to="/dashboard/profile">
                  <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:hover:bg-gray-900 dark:text-white text-gray-600 hover:bg-gray-50">
                    <FiUser />
                    View Profile
                  </p>
                </Link>
                <p
                  onClick={toggleTheme}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:hover:bg-gray-900 dark:text-white text-gray-600 hover:bg-gray-50"
                >
                  {theme === "light" ? (
                    <>
                      <MdOutlineDarkMode />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <MdOutlineLightMode />
                      Light Mode
                    </>
                  )}
                </p>

                <div className="mt-3 border-t border-gray-200 pt-[5px]">
                  <p
                    onClick={handleSignOut}
                    className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 dark:hover:text-red-400 dark:hover:bg-red-900 hover:bg-red-50"
                  >
                    <TbLogout2 />
                    Logout
                  </p>
                </div>
              </div>

              <IoIosArrowUp
                className={`${
                  accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                } transition-all duration-300 text-gray-600 dark:text-white lg:block hidden`}
              />
            </div>
          </div>

          {/* Dashboard Content */}
          <div className=" overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
