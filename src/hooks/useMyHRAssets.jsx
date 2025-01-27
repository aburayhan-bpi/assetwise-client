import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useCurrentUser from "./useCurrentUser";

const useMyHRAssets = (searchText, filterOption) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();


  const {
    data: hrAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["hrAssets", user?.email, currentUser, searchText, filterOption],
    enabled: !!currentUser?.affiliatedWith,
    queryFn: async () => {
      // const res = await axiosSecure.get(
      //   `/my-hr-assets?email=${currentUser?.affiliatedWith}`
      // );
      const res = await axiosSecure.get("/my-hr-assets", {
        params: {
          email: currentUser?.affiliatedWith,
          searchQuery: searchText,
          filterOption: filterOption,
        },
      });
      return res.data;
    },
  });

  return [hrAssets, refetch, isLoading];
};

export default useMyHRAssets;
