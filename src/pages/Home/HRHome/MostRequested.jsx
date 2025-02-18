import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";
import AssetCard from "../AssetCard";
import MostRequestedCard from "./MostRequestedCard";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MostRequested = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();

  const { data: mostRequested = [] } = useQuery({
    queryKey: ["mostRequested", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `top-most-requested?email=${
          currentUser?.role === "hr" && currentUser?.email
        }`
      );
      return res.data;
    },
  });
  // console.log(mostRequested);
  return (
    <div className=" mt-10 pt-10 pb-4 px-3 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Top Most Requests
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:px-3">
          {mostRequested.map((singleReq) => (
            <MostRequestedCard
              key={singleReq?._id}
              singleReq={singleReq}
            ></MostRequestedCard>
          ))}
        </div>
      </div>
      <Link to='/all-requests'>
      
      <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200">
        See More
        <FaChevronRight className="text-white text-xs" />
      </button>
      </Link>
    </div>
  );
};

export default MostRequested;
