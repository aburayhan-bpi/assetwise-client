import React from "react";
import { FaBox, FaCalendarAlt, FaBuilding } from "react-icons/fa";

const LimitedStockCard = ({ asset }) => {
  const {
    productName,
    productType,
    productQuantity,
    dateAdded,
    email,
    company,
    role,
  } = asset || {};

  return (
    <div className="bg-white dark:bg-gray-900 dark:border-none shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white/80">
          {productName || "Unknown Product"}
        </h3>
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase ${
            productQuantity === 0
              ? "bg-red-100 text-red-600 dark:bg-red-400 dark:text-red-700"
              : productQuantity < 10
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-400 dark:text-yellow-700"
              : "bg-green-100 text-green-600 dark:bg-green-400 dark:text-green-700"
          }`}
        >
          {productQuantity === 0 ? "Out of Stock" : `${productQuantity} Left`}
        </span>
      </div>

      {/* Product Details */}
      <div className="text-gray-600 dark:text-white/80 text-sm space-y-2 mb-4">
        <p className="capitalize">
          <strong>Type:</strong> {productType || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500 dark:text-white/80" />
          <span>
            <strong>Added on:</strong> {dateAdded || "Unknown Date"}
          </span>
        </p>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Contact Info */}
      <div className="text-gray-700 dark:text-white/80 text-sm space-y-2">
        <p className="flex items-center gap-2">
          <FaBuilding className="text-gray-500 dark:text-white/80" />
          <span>
            <strong>Company:</strong> {company || "N/A"}
          </span>
        </p>
        <p>
          <strong>Email:</strong> {email || "No Email Provided"}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="uppercase">{role || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default LimitedStockCard;
