import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useHr from "./useHr";
import useCurrentUser from "./useCurrentUser";

const useMyTeam = () => {
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const {
    data: myTeam = [],
    refetch: refetchTeam,
    isLoading,
  } = useQuery({
    queryKey: ["myTeam", user?.email, currentUser],
    queryFn: async () => {
      if (currentUser?.affiliatedWith) {
        const res = await axiosSecure.get(
          `/my-team?teamEmail=${currentUser?.affiliatedWith}`
        );
        return res.data;
      }
    },
  });
  return [myTeam, refetchTeam, isLoading];
};

export default useMyTeam;
