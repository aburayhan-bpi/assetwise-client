// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// const useAsset = (searchText, filterOption, sortOption) => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const {
//     data: assets = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["assets", user?.email, searchText, filterOption, sortOption],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/assets`, {
//         params: {
//           email: user?.email, // Pass the email as a query parameter
//         },
//       });
//       return res.data;
//     },
//   });

//   return [assets, refetch, isLoading];
// };

// export default useAsset;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAsset = (searchText, filterOption, sortOption) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", user?.email, searchText, filterOption, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets", {
        params: {
          email: user?.email,
          search: searchText,
          filterOption: filterOption,
          sortOption: sortOption,
        },
      });
      return res.data;
    },
  });

  return [assets, refetch, isLoading];
};

export default useAsset;
