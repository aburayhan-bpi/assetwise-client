import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useCurrentUser from "./useCurrentUser";

const useMyHRAssets = (searchText, filterOption) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentUser = useCurrentUser();
  // console.log(currentUser);
  const {
    data: myReqAssets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      "myReqAssets",
      user?.email,
      currentUser?.email,
      searchText,
      filterOption,
    ],
    enabled: !!currentUser?.affiliatedWith,
    queryFn: async () => {
      // const res = await axiosSecure.get(
      //   `/my-req-assets?email=${currentUser?.email}`
      // );
      const res = await axiosSecure.get("/my-req-assets", {
        params: {
          email: currentUser?.email,
          searchQuery: searchText,
          filterOption: filterOption,
        },
      });
      // console.log(res.data);
      return res.data;
    },
    // initialData: [],
  });

  return [myReqAssets, refetch, isLoading];
};

export default useMyHRAssets;
