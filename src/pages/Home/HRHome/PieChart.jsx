import { useQuery } from "@tanstack/react-query";
import React from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { PieChart as MinimalPieChart } from "react-minimal-pie-chart";

const PieChart = () => {
  const currentUser = useCurrentUser();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: piState = [] } = useQuery({
    queryKey: ["piState", currentUser],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/product-type-state?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  // Map piState to the format required by the PieChart component
  const chartData =
    piState?.map((item) => ({
      title: item.title,
      value: parseFloat(item.percentage), // Convert percentage to a number
      color: item.title === "returnable" ? "#E38627" : "#C13C37", // Optional: use different colors
    })) || [];

  return (
    <div className="md:flex justify-between bg-sky-200 pt-10 pb-4 px-3 rounded-md mb-6">
      <div className="flex-1 max-w-xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
        quod! Non inventore nobis enim reiciendis, sapiente repellendus animi
        voluptates consequatur.
      </div>
      <div className="">
        <MinimalPieChart
          data={chartData}
          animate
          label={({ dataEntry }) =>
            `${dataEntry.title}: ${Math.round(dataEntry.value)}%`
          }
          labelStyle={{
            fontSize: "5px",
            fontWeight: "bold",
            fill: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
