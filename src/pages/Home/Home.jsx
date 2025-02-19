import { Link } from "react-router-dom";
import AboutUs from "../../components/AboutUs/AboutUs";
import Banner from "../../components/Banner/Banner";
import Packages from "../../components/Packages/Packages";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import Accordion from "./Accordion";
import Pending from "./HRHome/Pending";

import MonthlyRequests from "./MonthlyRequests";
import PendingRequests from "./PendingRequests";
import MostRequested from "./HRHome/MostRequested";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import LimitedStock from "./HRHome/LimitedStock";
import PieChart from "./HRHome/PieChart";
import HRAccordion from "./HRHome/HRAccordion";
import RejectedRequests from "./HRHome/RejectedRequests";
import TopQuantityAssets from "./HRHome/TopQuantityAssets";
import FAQ from "./HRHome/FAQ";
import Support from "./HRHome/Support";
import HowItWork from "../../components/HowItWork/HowItWork";
import Testimonial from "../../components/Testimonial/Testimonial";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import ContactUs from "../../components/ContactUs/ContactUs";
import HowToRequest from "../../components/HowToRequest/HowToRequest";
import TipsAndTricks from "../../components/TipsAndTricks/TipsAndTricks";

const Home = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  // console.log(currentUser);

  useEffect(() => {}, [user, currentUser]);

  return (
    <div className="container mx-auto mt-6">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {!user && (
        <div>
          {/* Banner / Carousel */}
          <Banner />
          {/* Packages Section */}
          <Packages />
          {/* About Section */}
          <AboutUs />
          <HowItWork />
          <Testimonial />
          <WhyChoose />
          <ContactUs />
          <FAQ />
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
          {/* My Pending Requests */}
          <PendingRequests />
          {/* My Monthly Requests */}
          <MonthlyRequests />
          <HowToRequest />
          <Support />
          <Testimonial />
          <WhyChoose />
          <TipsAndTricks/>
          {/* Accordion section */}
          <Accordion />
        </>
      )}
      {/* For HR Manager */}
      {currentUser?.role === "hr" && currentUser?.limit <= 0 && (
        <>
          <h2 class="text-xl font-semibold text-center mb-4">
            Please make payment for access service
          </h2>
          <Link to="/payment">
            <button class="mx-auto block px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none">
              Make Payment
            </button>
          </Link>
        </>
      )}
      {currentUser?.role === "hr" && currentUser?.limit > 0 && (
        <>
          <PieChart />
          <Pending />
          <MostRequested />
          <LimitedStock />
          {/* <HRAccordion /> */}
          <RejectedRequests />
          <TopQuantityAssets />
          <FAQ />
          <Support />
        </>
      )}
    </div>
  );
};

export default Home;
