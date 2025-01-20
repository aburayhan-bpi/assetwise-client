import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useCurrentUser from "./useCurrentUser";

const useAsset = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const currentUser = useCurrentUser();
  const { user } = useAuth();
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets`);
      return res.data;
    },
  });
  return [assets, refetch, isLoading];
};

export default useAsset;
