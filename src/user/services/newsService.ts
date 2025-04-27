/**
 * Servicio para obtener noticias desde el backend.
 * Realiza una solicitud al endpoint /api/news y devuelve las noticias.
 */

// URL base del backend (ajusta según tu entorno)
const API_BASE_URL = "https://localhost:44385";

// Interfaces para tipar las respuestas del backend
interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: "success";
  data: Article[];
}

interface ErrorResponse {
  status: "error";
  message: string;
}

/**
 * Obtiene las noticias desde el backend.
 * @returns Una promesa que resuelve un arreglo de artículos si la solicitud es exitosa.
 * @throws Un error si la solicitud falla o el backend devuelve un error.
 */
export const getNews = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/News`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: Failed to fetch news`);
    }

    const data: NewsResponse = await response.json();

    if (data.status !== "success") {
      throw new Error("Unexpected response status from backend");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error instanceof Error ? error : new Error("Unknown error while fetching news");
  }
};