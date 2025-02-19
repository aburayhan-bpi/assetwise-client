import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const EmpChart = ({ stats }) => {
  console.log(stats);

  // Updated data according to your stats
  const data = [
    { name: "Approved Assets", value: stats?.approvedAssets || 0 },
    { name: "Pending Assets", value: stats?.pendingAssets || 0 },
    { name: "Requested Assets", value: stats?.requestedAssets || 0 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  return (
    <div style={{ width: "90%", height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            // label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmpChart;
