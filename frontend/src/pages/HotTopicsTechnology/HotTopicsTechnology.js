import { useEffect, useState } from "react";
import Loader from "../../utils/Loader/Loader";
import ArticleRSS from "../../components/ArticleRSS/ArticleRSS";
import { API } from "../../api";

const HotTopicsTechnology = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/rss/technology`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div>
      <h2>TECHNOLOGY & SCIENCE</h2>

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

export default HotTopicsTechnology;
