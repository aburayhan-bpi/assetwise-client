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
    data: myReqAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReqAssets", user?.email, currentUser],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-req-assets?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  return [myReqAssets, refetch, isLoading];
};

export default useMyHRAssets;
