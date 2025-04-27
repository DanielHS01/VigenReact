import { Poll } from "../services/pollService";

// utils/educationUtils.ts
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
  export const processEducationData = (pollData: Poll[]) => {
    const educationLabels: Record<number, string> = {
      0: "Primaria",
      1: "Secundaria",
      2: "Técnico",
      3: "Tecnólogo",
      4: "Universitario",
      5: "Postgrado",
      6: "Otro",
    };
  
    const counts: Record<string, number> = {};
  
    // Convertimos el pollData a PollData (sin necesidad de convertir user_id a string)
    const mappedPollData: PollData[] = pollData.map((poll) => ({
      ...poll,
      user_id: poll.user_id, // Dejamos user_id como número
    }));
  
    mappedPollData.forEach((poll) => {
      const level = educationLabels[poll.nivelEducativo];
  
      counts[level || "Desconocido"] = (counts[level || "Desconocido"] || 0) + 1;
    });
  
    const total = mappedPollData.length;
  
    const processedData = Object.keys(counts).map((level) => ({
      name: level,
      value: parseFloat(((counts[level] / total) * 100).toFixed(2)),
    }));
  
    return processedData;
  };