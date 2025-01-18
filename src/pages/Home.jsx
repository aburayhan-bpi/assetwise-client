import AboutUs from "../components/AboutUs/AboutUs";
import Banner from "../components/Banner/Banner";
import Packages from "../components/Packages/Packages";
import useCurrentUser from "../hooks/useCurrentUser";

const Home = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <div className="max-w-screen-xl mx-auto">
      <h2>Home page</h2>
      {/* Banner / Carousel */}
      <Banner />
      {/* Packages Section */}
      <Packages />
      {/* About Section */}
      <AboutUs />
    </div>
  );
};

export default Home;
