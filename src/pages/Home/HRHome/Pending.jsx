import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Link, useHref } from "react-router-dom";
import useHr from "../../../hooks/useHr";
import AssetCard from "../AssetCard";
import { FaChevronRight } from "react-icons/fa";

const Pending = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();

  const { data: pendingAssets = [] } = useQuery({
    queryKey: ["pendingAssets", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `pending-assets?email=${
          currentUser?.role === "hr" && currentUser?.email
        }`
      );
      return res.data;
    },
  });
  // console.log(pendingAssets);
  return (
    <div className="bg-sky-200 pt-10 pb-4 px-3 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-8 text-center text-3xl font-bold">Pending Requsts</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-3">
          {pendingAssets.map((singleReq) => (
            <AssetCard key={singleReq?._id} singleReq={singleReq}></AssetCard>
          ))}
        </div>
      </div>
      <Link to="/all-requests">
        <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
          See More
          <FaChevronRight className="text-white text-xs" />
        </button>
      </Link>
    </div>
  );
};

export default Pending;
