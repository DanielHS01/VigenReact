const newsQuery = 'Violencia de Genero';

// Obtener la fecha actual
const today = new Date();

// Create a new date object to represent half a month (15 days) ago
const halfMonthAgo = new Date(today);
halfMonthAgo.setDate(today.getDate() - 15);

// Ensure the date adjustment doesn't overflow or behave unexpectedly
// No need for additional manual month boundary checks
const formattedDate = halfMonthAgo.toISOString().split('T')[0];
console.log(formattedDate);
// Obtener la clave de la API desde las variables de entorno de Vite
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

if (!NEWS_API_KEY) {
  throw new Error("No API key found. Please set the API key in your environment variables.");
}

const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${newsQuery}&from=${formattedDate}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

export const getNews = async () => {
  try {
    const res = await fetch(NEWS_API_URL);
    const data = await res.json();
    const { articles } = data;
    const topNews = articles.splice(0, 3);
    return topNews;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
