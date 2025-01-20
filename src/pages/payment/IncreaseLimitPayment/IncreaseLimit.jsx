import { useState } from "react";
import Payment from "./Payment";

const IncreaseLimit = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };
//   console.log(selectedPackage);
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Increase Your Limit
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Choose a package to expand your team and unlock more members!
        </p>
      </div>

      {/* Package Selection Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Package 1 */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
          <h3 className="text-3xl font-bold mb-3">5 Members</h3>
          <p className="text-lg mb-4">$5/month</p>
          <ul className="list-disc pl-6 mb-6 text-sm">
            <li>Access to 5 team members</li>
            <li>Basic support</li>
            <li>Upgrade anytime</li>
          </ul>
          <button
            onClick={() => handleSelectPackage(5)}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Select Package
          </button>
        </div>

        {/* Package 2 */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
          <h3 className="text-3xl font-bold mb-3">10 Members</h3>
          <p className="text-lg mb-4">$8/month</p>
          <ul className="list-disc pl-6 mb-6 text-sm">
            <li>Access to 10 team members</li>
            <li>Priority support</li>
            <li>Upgrade anytime</li>
          </ul>
          <button
            onClick={() => handleSelectPackage(8)}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Select Package
          </button>
        </div>

        {/* Package 3 */}
        <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
          <h3 className="text-3xl font-bold mb-3">20 Members</h3>
          <p className="text-lg mb-4">$15/month</p>
          <ul className="list-disc pl-6 mb-6 text-sm">
            <li>Access to 20 team members</li>
            <li>24/7 premium support</li>
            <li>Priority access to features</li>
          </ul>
          <button
            onClick={() => handleSelectPackage(15)}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Select Package
          </button>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl text-center font-bold">Make Payment</h2>
        {/* Payment Form Section */}
        <Payment price={selectedPackage}></Payment>
      </div>
    </div>
  );
};

export default IncreaseLimit;
