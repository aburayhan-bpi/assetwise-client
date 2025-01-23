import AboutUs from "../../components/AboutUs/AboutUs";
import Banner from "../../components/Banner/Banner";
import Packages from "../../components/Packages/Packages";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import Card from "./Card";

const Home = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <div className="max-w-screen-xl mx-auto mt-6">
      {!user && (
        <div>
          {/* Banner / Carousel */}
          <Banner />
          {/* Packages Section */}
          <Packages />
          {/* About Section */}
          <AboutUs />
        </div>
      )}

      {/* others section conditionally */}
      {currentUser?.role === "employee" && !currentUser?.affiliatedWith && (
        <>
          <div className="flex justify-center items-center">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:from-green-500 hover:to-blue-600 hover:scale-105 transition duration-300">
              Contact with your HR
            </button>
          </div>
        </>
      )}
      {currentUser?.role === "employee" && currentUser?.affiliatedWith && (
        <>
          <div className="flex flex-col justify-center items-center mt-10 bg-sky-200 p-2 rounded-md">
            <h2 className="mb-8 text-center text-3xl font-bold">
              My Pending Requst
            </h2>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col justify-center items-center mt-10 bg-blue-200 p-2 rounded-md">
            <h2 className="mb-8 text-center text-3xl font-bold">
              My Monthly Requst
            </h2>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
