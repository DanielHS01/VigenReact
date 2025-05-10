import { useEffect, useState } from "react";
import { getPolls, Poll } from "@/organization/services/pollService.ts";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const Gender = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const data = await getPolls();
        setPolls(data);
      } catch (error) {
        console.error("Error al obtener encuestas");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return <div>Cargando estadísticas...</div>;
  }

  // Procesar datos
  const totalHombres = polls.filter((p) => p.genero === 1).length;
  const totalMujeres = polls.filter((p) => p.genero === 0).length;
  const otros = polls.filter((p) => p.genero !== 0 && p.genero !== 1).length;

  const data: DataItem[] = [
    { name: "Hombres", value: totalHombres },
    { name: "Mujeres", value: totalMujeres },
    { name: "Otros", value: otros },
  ];

  const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

  return (
    <div style={{ textAlign: "center" }} className="w-full h-[400px]">
      <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
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
};

export default Gender;
