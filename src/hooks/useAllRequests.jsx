import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useCurrentUser from "./useCurrentUser";

const useAllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();

  const {
    data: allRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allRequests", user?.email, currentUser],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-requests?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  return [allRequests, refetch, isLoading];
};

export default useAllRequests;
