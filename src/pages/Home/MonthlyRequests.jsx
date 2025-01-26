import React from "react";
import Card from "./AssetCard";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AssetCard from "./AssetCard";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const MonthlyRequests = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();

  const { data: monthRequests = [] } = useQuery({
    queryKey: ["monthRequests", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `monthly-requests?email=${currentUser?.email}`
      );
      return res.data;
    },
  });
  // console.log(monthRequests);

  return (
    <div className="mt-10 bg-sky-200 pt-10 pb-4 px-2 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-8 text-center text-3xl font-bold">
          My Monthly Requst
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-3">
          {monthRequests.map((singleReq) => (
            <AssetCard key={singleReq?._id} singleReq={singleReq}></AssetCard>
          ))}
        </div>
      </div>{" "}
      <Link to="/my-assets">
        <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
          See More
          <FaChevronRight className="text-white text-xs" />
        </button>
      </Link>
    </div>
  );
};

export default MonthlyRequests;
