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
  return (
    <div className="relative flex flex-col md:flex-row bottom-7 px-10 justify-center items-center md:justify-around space-y-10 md:space-y-0 z-10 overflow-hidden">
      {news &&
        news.map((article) => (
          <div
            key={article.url}
            className="w-64 md:w-96 h-96 rounded-xl bg-white text-cyan-950 dark:bg-customCyan dark:text-cyan-50 py-2 px-3 space-y-5 flex flex-col justify-start"
          >
            <h2>{article.description}</h2>
            <div className="flex justify-center items-center py-2">
              <img src={article.urlToImage} alt={article.title} />
            </div>
            <Link
              to={article.url}
              className="transition-all ms-3 hover:underline underline-offset-2"
              target="_blank"
            >
              Ver noticia completa
            </Link>
          </div>
        ))}
    </div>
  );
};

export default News;
