import React from "react";

const MostRequestedCard = ({ singleReq }) => {
  const { productName, productType, totalRequests } = singleReq || {};

  return (
    <div className="bg-white dark:bg-gray-900 dark:border-none shadow-lg rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {productName || "Unknown Product"}
        </h3>
      </div>

      {/* Product Details */}
      <div className="text-gray-600 dark:text-white text-sm">
        <p className="mb-2 capitalize">
          <strong>Type:</strong>{" "}
          <span
            className={`${
              productType === "returnable"
                ? "text-yellow-500"
                : "text-yellow-500"
            }`}
          >
            {productType || "N/A"}
          </span>
        </p>
        <p className="mb-2">
          <strong>Total Requests:</strong> {totalRequests || 0}
        </p>
      </div>
    </div>
  );
};

export default MostRequestedCard;
