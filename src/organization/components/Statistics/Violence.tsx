import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { processViolenceStatistics } from "@/organization/utils/surveyUtils";
import { getPolls } from "@/organization/services/pollService"; // Tu fetch existente

type DataItem = {
  name: string;
  value: number;
};

const Violence = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pollData = await getPolls(); // Usa el fetchPoll que ya tienes
        const processed = processViolenceStatistics(pollData);
        setData(processed);
      } catch (error) {
        console.error("Error loading poll data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Cargando estadísticas de violencia...</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={80}
          />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Violence;
