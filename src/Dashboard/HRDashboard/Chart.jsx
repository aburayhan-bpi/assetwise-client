import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = ({ stats }) => {
  console.log(stats);

  const {
    returnableCount,
    nonReturnableCount,
    totalRequested,
    totalAddedAssets,
  } = stats || {};

  // Ensure all data points have the same structure (keys)
  const data = [
    {
      name: "Asset Type",
      returnable: returnableCount,
      nonReturnable: nonReturnableCount,
      requested: 0, // Set to 0 for missing data
      assets: 0, // Set to 0 for missing data
    },
    {
      name: "Total Requested",
      returnable: 0, // Set to 0 for missing data
      nonReturnable: 0,
      requested: totalRequested,
      assets: 0,
    },
    {
      name: "Total Assets",
      returnable: 0,
      nonReturnable: 0,
      requested: 0,
      assets: totalAddedAssets,
    },
  ];

  return (
    <div>
      <div className="w-full h-[400px] p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4">Statistics</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Line for Returnable Assets */}
            <Line
              type="monotone"
              dataKey="returnable"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* Line for Non-Returnable Assets */}
            <Line
              type="monotone"
              dataKey="nonReturnable"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            {/* Line for Total Requested */}
            <Line
              type="monotone"
              dataKey="requested"
              stroke="#ffc658"
              activeDot={{ r: 8 }}
            />
            {/* Line for Total Assets */}
            <Line
              type="monotone"
              dataKey="assets"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
