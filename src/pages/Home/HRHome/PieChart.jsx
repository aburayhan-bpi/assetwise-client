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
        <h2 className="text-xl font-semibold mb-4">
          Asset Type Distribution: Returnable vs Non-Returnable
        </h2>
        <p className="text-md text-gray-700 mb-4">
          This chart represents the percentage distribution of returnable and
          non-returnable assets requested by employees. The "Returnable" items
          can be returned after use, while "Non-Returnable" items cannot. By
          analyzing this data, HR managers can better plan for the asset
          management and identify trends in asset requests.
        </p>
        <p className="text-sm text-gray-600">
          Returnable assets make up{" "}
          {piState?.find((item) => item.title === "returnable")?.percentage}% of
          the total requested assets, while non-returnable assets account for{" "}
          {piState?.find((item) => item.title === "non-returnable")?.percentage}
          %.
        </p>
      </div>
      <div className="flex justify-center items-center mt-6 md:mt-0">
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
          style={{ height: "200px", width: "200px" }}
        />
      </div>
    </div>
  );
};

export default PieChart;
