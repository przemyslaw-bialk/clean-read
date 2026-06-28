import { useState, useEffect } from "react";
import Loader from "../../utils/Loader/Loader";
import ArticleRSS from "../../components/ArticleRSS/ArticleRSS";
import { API } from "../../api";

const HotTopicsPoland = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/rss/top-news-poland`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="hot-topics-pl">
      <h2>HOT Articles from wp.pl</h2>
      {loading ? (
        <Loader />
      ) : (
        articles.map((article, index) => (
          <ArticleRSS article={article} key={index} />
        ))
      )}
    </div>
  );
};

export default HotTopicsPoland;
