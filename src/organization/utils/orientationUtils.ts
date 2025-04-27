export interface PollData {
    id: number;
    user_id: number;
    date: string;
    genero: number;
    orientacionSexual: number;
    edad: number;
    municipio: number;
    sector: number;
    nivelEducativo: number;
    estadoCivil: number;
    etnia: number;
    ingresos: number;
    ocupacion: number;
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    p6: number;
    p7: number;
  }
interface OrientationCount {
    name: string;
    value: number;
  }
  
  const orientationMap: Record<number, string> = {
    0: "Heterosexual",
    1: "Homosexual",
    2: "Bisexual",
    3: "No Binario",
    4: "Otro"
  };
  
  export function getOrientationData(polls: PollData[]): OrientationCount[] {
    const counts: Record<string, number> = {};
  
    polls.forEach((poll) => {
      const orientationName = orientationMap[poll.orientacionSexual] || "Desconocido";
      counts[orientationName] = (counts[orientationName] || 0) + 1;
    });
  
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }
  