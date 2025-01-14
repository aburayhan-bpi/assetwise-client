import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
const MainLayout = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className="bg-white">
      {location?.pathname === "/login" ? "" : <Navbar />}

      <div className="pt-10 min-h-[calc(100vh-72px)]">
        <Outlet />
      </div>
      {location?.pathname === "/login" ? "" : <Footer />}
    </div>
  );
};

export default MainLayout;
