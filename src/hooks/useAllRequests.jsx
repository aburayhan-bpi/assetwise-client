import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useCurrentUser from "./useCurrentUser";

const useAllRequests = (searchText, sortOption) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();

  const {
    data: allRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allRequests", user?.email, currentUser, searchText, sortOption],
    queryFn: async () => {
      // const res = await axiosSecure.get(
      //   `/all-requests?email=${currentUser?.email}`
      // );
      const res = await axiosSecure.get("/all-requests", {
        params: {
          hrEmail: currentUser?.email,
          searchQuery: searchText,
          sortOption: sortOption,
        },
      });
      return res.data;
    },
    // refetchOnWindowFocus: true,
    // staleTime: 1000,
  });

  return [allRequests, refetch, isLoading];
};

export default useAllRequests;
