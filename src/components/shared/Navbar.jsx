import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const links = (
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

    // for normal employee routes
    // <>
    //   <li>
    //     <NavLink
    //       to="/"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Home
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/my-assets"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       My Assets
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/my-team"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       My Team
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/request-asset"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Request for an Asset
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/profile"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Profile
    //     </NavLink>
    //   </li>
    // </>
    // for HR Manager routes
    // <>
    //   <li>
    //     <NavLink
    //       to="/"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Home
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/asset-list"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Asset List
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/add-asset"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Add Asset
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/all-requests"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       All Requests
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/my-employee-list"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       My Employee List
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/add-employee"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Add Employee
    //     </NavLink>
    //   </li>
    //   <li>
    //     <NavLink
    //       to="/profile"
    //       className="block py-2 px-3 rounded md:bg-transparent"
    //       aria-current="page"
    //     >
    //       Profile
    //     </NavLink>
    //   </li>
    // </>
  );

  return (
    <div>
      <nav className="bg-gray-100 border-b border-gray-100 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img
              className="w-32 rounded-md"
              src="./assetwise.jpg"
              alt="company_logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/login">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
