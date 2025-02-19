import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AssetCard from "./AssetCard";
import useHr from "../../hooks/useHr";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PendingRequests = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();
  // const isHr = useHr();
  // console.log("is HR: ", isHr);

  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `pending-requests?email=${currentUser?.email}`
      );
      return res.data;
    },
  });
  // console.log(pendingRequests);
  return (
    <div className="mt-10  pt-10 pb-4 px-2 rounded-md">
      <div className="flex flex-col justify-center items-center ">
        <h2 className="mb-2 text-center text-3xl font-bold dark:text-white">
          My Pending Request
        </h2>
        <p className="text-center max-w-lg mx-auto mb-8 dark:text-white/80">
          Your Pending Request — Stay Updated with Your Ongoing Inquiries
        </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:px-3">
          {pendingRequests.map((singleReq) => (
            <AssetCard key={singleReq?._id} singleReq={singleReq}></AssetCard>
          ))}
        </div>
      </div>
      <Link to="/my-assets">
        <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
          See More
          <FaChevronRight className="text-white text-xs" />
        </button>
      </Link>
    </div>
  );
};

export default PendingRequests;
