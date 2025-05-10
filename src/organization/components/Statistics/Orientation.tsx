import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getPolls } from "@/organization/services/pollService";
import { getOrientationData } from "@/organization/utils/orientationUtils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

function Orientation() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    getPolls().then((polls) => {
      setData(getOrientationData(polls));
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }} className="w-full h-[400px]">
      <ResponsiveContainer>
      <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
      </ResponsiveContainer>
      
    </div>
  );
}

export default Orientation;
