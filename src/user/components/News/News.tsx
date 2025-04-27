import Button from "@/shared/ui/Button";
import { getNews, Article } from "@/user/services/newsService"; // Importar desde el nuevo servicio
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Imagen predeterminada para cuando urlToImage es null
const DEFAULT_IMAGE = "https://via.placeholder.com/150?text=No+Image"; // Puedes cambiar esta URL por una imagen predeterminada de tu proyecto

const News = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await getNews();
        setNews(articles);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Función para formatear la fecha
  const formatPublishedDate = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options); // "Oct 10"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-cyan-950 dark:text-cyan-50">Cargando noticias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row bottom-7 px-10 justify-center items-center md:justify-around space-y-10 md:space-y-0 z-10 overflow-hidden">
      {news.length === 0 ? (
        <p className="text-cyan-950 dark:text-cyan-50">
          No se encontraron noticias.
        </p>
      ) : (
        news.map((article) => (
          <div
            key={article.url}
            className="w-72 md:w-[22rem] h-[27rem] md:h-96 rounded-xl overflow-hidden bg-white text-cyan-950 dark:bg-customCyan dark:text-cyan-50 space-y-5 flex flex-col justify-start"
          >
            <div className="flex justify-center items-center relative">
              <img
                src={article.urlToImage ?? DEFAULT_IMAGE}
                alt={article.title}
                className="w-full h-52 object-cover"
                onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)} // Si la imagen falla, usa la predeterminada
              />
              <div className="absolute bottom-36 right-4 bg-customCyan text-white h-14 w-14 font-bold flex justify-center items-center rounded-full">
                {formatPublishedDate(article.publishedAt)}
              </div>
            </div>
            <h2 className="font-bold uppercase px-2">{article.title}</h2>
            <div className="px-2">
              <Button variant="secondary">
                <Link
                  to={article.url}
                  className="transition-all hover:underline underline-offset-2"
                  target="_blank"
                >
                  Ver noticia completa
                </Link>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default News;
