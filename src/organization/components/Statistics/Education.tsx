import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { processEducationData } from "@/organization/utils/educationUtils";
import { getPolls } from "@/organization/services/pollService"; // Usando tu mismo fetchPoll
import { PollData } from "@/organization/utils/educationUtils";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#6633CC",
  "#FF3333",
];

const Education = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEducationData = async () => {
      try {
        const pollData: PollData[] = await getPolls();
        const processed = processEducationData(pollData);
        setData(processed);
      } catch (error) {
        console.error("Error loading education data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEducationData();
  }, []);

  if (loading) return <div>Cargando niveles educativos...</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Education;
