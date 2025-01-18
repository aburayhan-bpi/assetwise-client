import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // console.log(currentUser);
  const dropdownRef = useRef(null);
  const [users] = useUser();

  useEffect(() => {
    const currentUser = users.find((u) => u?.email === user?.email);
    setCurrentUser(currentUser);
  }, [user, users]);

  // Toggle Menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Toggle Dropdown for user menu
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close Dropdown when clicking outside of it
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Listen for outside clicks and close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Sign out user
  const handleSignOut = () => {
    logOut().then(() => {
      console.log("sign out done");
      toast.success("Logged Out!");
      navigate("/");
    });
  };

  // Links to be rendered
  const links = (
    <>
      {!user && (
        <>
          <li>
            <NavLink
              to="/"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-employee"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-hr"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}
      {user && currentUser?.role === "employee" && (
        <>
          <li>
            <NavLink
              to="/"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-assets"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-team"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/request-asset"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Request for an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="block py-2 px-3 rounded md:bg-transparent"
              aria-current="page"
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
      {user && currentUser?.role === "hr" && (
        <>
          <li>
            <NavLink
              to="/"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/asset-list"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-asset"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              Add Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-requests"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-employee-list"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              My Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-employee"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="block  rounded md:bg-transparent"
              aria-current="page"
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed z-50 w-full">
      <nav className="bg-gray-100 border-b border-gray-100 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-4 xl:px-0">
          <Link to="/">
            {user && currentUser?.role === "hr" ? (
              <img
                className="w-32 h-10 overflow-hidden rounded-md"
                src={currentUser?.companyPhoto}
                alt="company_logo"
              />
            ) : (
              <img
                className="w-32 object-contain rounded-md"
                src="./assetwise.jpg"
                alt="company_logo"
              />
            )}
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <div ref={dropdownRef} className="dropdown dropdown-end">
                {/* Dropdown Toggle Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="p-0 m-0 rounded-full overflow-hidden"
                  onClick={toggleDropdown}
                >
                  {user && user?.photoURL ? (
                    <img
                      className="object-cover rounded-full w-10 h-10"
                      src={user?.photoURL}
                      alt={user?.displayName}
                    />
                  ) : (
                    <img
                      className="object-cover rounded-full w-10 h-10"
                      src="https://i.ibb.co/47rYJsQ/images-removebg-preview.png"
                      alt={user?.displayName}
                    />
                  )}
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-32 p-2 shadow"
                  >
                    <div>
                      <p className="pb-1 border-b font-semibold text-xs">
                        {user?.displayName}
                      </p>
                    </div>
                    <div className="pt-2 rounded-sm">
                      <div
                        onClick={handleSignOut}
                        className="cursor-pointer hover:bg-transparent hover:text-red-400"
                      >
                        Sign Out
                      </div>
                    </div>
                  </ul>
                )}
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

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`items-center justify-between w-full lg:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 md:border-0">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
