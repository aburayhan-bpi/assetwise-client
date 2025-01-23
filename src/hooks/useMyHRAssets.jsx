import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useCurrentUser from "./useCurrentUser";

const useMyHRAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();

  const {
    data: hrAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["hrAssets", user?.email, currentUser],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-hr-assets/${currentUser?.affiliatedWith}`
      );
      return res.data;
    },
  });

  return [hrAssets, refetch, isLoading];
};

export default useMyHRAssets;
