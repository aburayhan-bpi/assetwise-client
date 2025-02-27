import React from "react";
import useAuth from "../../../hooks/useAuth";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const RejectedRequests = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();

  const { data: rejectedRequests = [] } = useQuery({
    queryKey: ["rejectedRequests", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `rejected-requests?email=${
          currentUser?.role === "hr" && currentUser?.email
        }`
      );
      return res.data;
    },
  });

  return (
    <div className=" mt-10 pt-10 pb-4 px-6 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-white">
          Rejected Requests
        </h2>
        <p className="text-center max-w-lg mx-auto mb-8 dark:text-white/80">
          Stay informed about all rejected requests and take the necessary steps
          to resolve or address them.
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:px-6">
          {rejectedRequests.map((singleData) => (
            <div
              key={singleData?._id}
              className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 w-full max-w-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="space-y-4">
                {/* Product Name */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white/80">
                  {singleData?.productName}
                </h3>

                {/* Product Note */}
                <p className="text-gray-600 dark:text-white/80 text-sm">
                  Note:{" "}
                  <span className="text-gray-500 dark:text-white/80">
                    {singleData?.note ? singleData?.note : "N/A"}
                  </span>
                </p>

                {/* Requester & Date */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-white/80">
                  <div>
                    <span className="font-semibold">Requester: </span>
                    {singleData?.requesterName}
                  </div>
                  <div>
                    <span className="font-semibold">Request Date: </span>
                    {singleData?.requestDate}
                  </div>
                </div>

                {/* Status */}
                <div className="text-sm text-gray-600 dark:text-white/80">
                  <span className="font-semibold">Status: </span>
                  <span className="text-red-500 capitalize bg-red-100 dark:text-red-300 dark:bg-red-700 rounded-md px-2 py-1 text-xs">
                    {singleData?.status}
                  </span>
                </div>

                {/* Approval Date */}
                <div className="text-sm text-gray-600 dark:text-white/80">
                  <span className="font-semibold">Approval Date: </span>
                  {singleData?.approvalDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* See More Button */}
      <Link to="/all-requests">
        <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          See More
          <FaChevronRight className="text-white text-xs" />
        </button>
      </Link>
    </div>
  );
};

export default RejectedRequests;
