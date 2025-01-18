// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Button from "./Button";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg"
      >
        <SwiperSlide>
          <div className="relative">
            <div className="relative">
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {/* Image */}
              <img
                className="object-cover w-full h-full"
                src="https://i.ibb.co/wRVkmyf/employee.jpg"
                alt="employee"
              />
            </div>
            {/* Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Link to="/join-employee">
                <Button title={"Join as Employee"} />
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <div className="relative">
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {/* Image */}
              <img
                className="object-cover w-full h-full"
                src="https://i.ibb.co/Ry9mphK/hr-manager.jpg"
                alt="hr-manager"
              />
            </div>
            {/* Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Link to="join-hr">
                <Button title={"Join as HR Manager"} />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
