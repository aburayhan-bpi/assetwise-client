import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useCurrentUser from "./useCurrentUser";

const useEmpReqAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();

  const {
    data: myReqAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReqAssets", user?.email, currentUser],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-req-assets?email=${
          currentUser?.affiliatedWith &&
          currentUser?.role === "employee" &&
          currentUser?.email
        }`
      );
      return res.data;
    },
  });

  return [myReqAssets, refetch, isLoading];
};

export default useEmpReqAssets;
