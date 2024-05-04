const newsQuery = 'Violencia de Genero'
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${newsQuery}&from=2024-04-04&sortBy=publishedAt&apiKey=42fd9556b8174c4f82d5a9afac30d19c`;

export const getNews = async () => {
    const res = await fetch(NEWS_API_URL);
    const data = await res.json();
    const { articles } = data;
    const topNews = articles.splice(0, 3);
    return topNews;
}