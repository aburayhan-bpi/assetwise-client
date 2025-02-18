import { FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";

const AssetCard = ({ singleReq }) => {
  const {
    productName,
    productType,
    note,
    requesterName,
    requesterEmail,
    requestDate,
    status,
    requesterAffiliatedWith,
  } = singleReq || {};

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {productName || "Unknown Product"}
        </h3>
        <span
          className={` rounded-md px-2 py-1 text-xs
            ${
              status === "pending" &&
              "bg-yellow-50 text-yellow-500 dark:text-yellow-400 dark:bg-yellow-700 capitalize"
            } 
            ${status === "approved" && "bg-green-50 text-green-500 capitalize"} 
            ${
              status === "returned" && "bg-violet-50 text-violet-500 capitalize"
            } 
            ${status === "cancelled" && "bg-red-50 text-red-500 capitalize"} 
            ${status === "rejected" && "bg-red-50 text-red-500 capitalize"}`}
        >
          {status}
        </span>
      </div>

      {/* Product Details */}
      <p className="text-gray-600 dark:text-white/80 text-sm mb-2 capitalize">
        <strong>Type:</strong> {productType || "N/A"}
      </p>
      <p className="text-gray-600 dark:text-white/80 text-sm mb-4">
        <strong>Note:</strong> {note || "No additional notes provided."}
      </p>

      {/* Requester Info */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-white/80 mb-2">
          <FaUser className="text-gray-500 dark:text-white/80" />
          <span>{requesterName || "Unknown Requester"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-white/80 mb-2">
          <FaEnvelope className="text-gray-500 dark:text-white/80" />
          <span>{requesterEmail || "No Email Provided"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-white/80">
          <FaCalendarAlt className="text-gray-500 dark:text-white/80" />
          <span>{requestDate || "Unknown Date"}</span>
        </div>
        <p className="text-gray-600 dark:text-white/80 text-sm mt-2">
          <strong>Affiliated with:</strong>{" "}
          {requesterAffiliatedWith || "Not Specified"}
        </p>
      </div>
    </div>
  );
};

export default AssetCard;
