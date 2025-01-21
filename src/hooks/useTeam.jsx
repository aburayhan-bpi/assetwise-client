import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useHr from "./useHr";

const useTeam = () => {
  const { user } = useAuth();
  const hr = useHr();
  const axiosSecure = useAxiosSecure();
  const {
    data: team = [],
    refetch: refetchTeam,
    isLoading,
  } = useQuery({
    queryKey: ["team", user?.email, hr],
    queryFn: async () => {
      if (hr) {
        const res = await axiosSecure.get(`/team/${user?.email}`);
        return res.data;
      }
    },
  });
  return [team, refetchTeam, isLoading];
};

export default useTeam;
