import Button from "@/shared/ui/Button";
import { getNews } from "@/user/services/news";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Article {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const News = () => {
  const [news, setNews] = useState<Article[]>();
  useEffect(() => {
    getNews().then((topNews) => setNews(topNews));
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

  return (
    <div className="relative flex flex-col md:flex-row bottom-7 px-10 justify-center items-center md:justify-around space-y-10 md:space-y-0 z-10 overflow-hidden">
      {news &&
        news.map((article) => (
          <div
            key={article.url}
            className=" w-72 md:w-[22rem] h-[27rem] md:h-96 rounded-xl overflow-hidden bg-white text-cyan-950 dark:bg-customCyan dark:text-cyan-50 space-y-5 flex flex-col justify-start"
          >
            <div className="flex justify-center items-center relative">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-52 "
              />
              <div className="absolute bottom-36 right-4 bg-customCyan text-white h-14 w-14 font-bold flex justify-center items-center rounded-full">
                {formatPublishedDate(article.publishedAt)}
              </div>
            </div>
            <h2 className=" font-bold uppercase px-2">{article.title}</h2>
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
        ))}
    </div>
  );
};

export default News;
