const API_URL = 'https://vigenbackend.up.railway.app/api/Poll'; // <-- cambia aquí por tu endpoint real

export interface Poll {
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
  
  export const getPolls = async (): Promise<Poll[]> => {
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data: Poll[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching polls:', error);
      throw error;
    }
  };