import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import LimitedStockCard from "./LimitedStockCard";

const LimitedStock = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();

  const { data: limitedStock = [] } = useQuery({
    queryKey: ["limitedStock", currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `limited-stock-assets?email=${
          currentUser?.role === "hr" && currentUser?.email
        }`
      );
      return res.data;
    },
  });
  // console.log(limitedStock);
  return (
    <div className=" mt-10 pt-10 pb-4 px-3 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-2 text-center text-3xl font-bold dark:text-white">
          Limited Stock Assets
        </h2>
        <p className="text-center max-w-lg mx-auto mb-8 dark:text-white/80">
          Explore the limited stock assets that require your immediate attention
          before they run out.
        </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 xl:px-3">
          {limitedStock.map((asset) => (
            <LimitedStockCard key={asset?._id} asset={asset}></LimitedStockCard>
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

export default LimitedStock;
