export interface SurveyData {
  UserId: string;
  Date: string;
  Genero: number;
  OrientacionSexual: number;
  Edad: number;
  Municipio: number;
  Sector: number;
  NivelEducativo: number;
  EstadoCivil: number;
  Etnia: number;
  Ingresos: number;
  Ocupacion: number;
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  P6: number;
  P7: number;
}

export const submitSurvey = async (data: SurveyData): Promise<SurveyData> => {
  try {
    const response = await fetch("https://vigenbackend.up.railway.app/api/Poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error del servidor: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al enviar encuesta:", error);
    throw error;
  }
};