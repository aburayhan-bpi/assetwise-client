import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
// import Nav from "../components/shared/Nav";
import Footer from "../components/shared/Footer";
const MainLayout = () => {
  const location = useLocation();
  // console.log(location);

  return (
    <>
      {location.pathname.includes("dashboard") ? (
        ""
      ) : (
        <div className="bg-white dark:bg-black lg:px-8">
          {/* {location?.pathname === "/login" ? "" : <Nav />} */}
          {location?.pathname === "/login" ? "" : <Navbar />}
        </div>
      )}

      <div>
        {/* min-h-[calc(100vh-1px)] */}
        <div className="pt-20 min-h-screen px-4">
          <Outlet />
        </div>
        {location?.pathname === "/login" ? "" : <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
