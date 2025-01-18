import React from "react";
import aboutImage from "../../../public/about-us.json";
import Lottie from "lottie-react";
const AboutUs = () => {
  return (
    <div className="bg-green-50 rounded-md p-3">
      <h2 className="font-bold text-3xl text-center my-8">About Us</h2>
      <div className="md:flex gap-6 justify-between items-center">
        {/* side image */}
        <div className="flex-1">
          <Lottie animationData={aboutImage}></Lottie>
        </div>
        {/* about content */}
        <div className="flex-1">
          <p>
            AssetWise is a comprehensive asset management system tailored to
            meet the diverse needs of businesses seeking to efficiently manage,
            track, and optimize their physical and digital assets. Whether
            you're managing a large inventory of products, machinery, or digital
            resources, AssetWise provides a robust platform that simplifies
            asset tracking, enables insightful decision-making through advanced
            analytics, and enhances overall operational efficiency. Our
            user-friendly interface, combined with scalable features, ensures
            that AssetWise grows with your business, helping you maximize asset
            value while minimizing risks and reducing operational costs. With
            AssetWise, businesses can unlock long-term value and stay ahead in a
            competitive marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
