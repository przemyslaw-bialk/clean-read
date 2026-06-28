import { useEffect, useState } from "react";
import Loader from "../../utils/Loader/Loader";
import ArticleRSS from "../../components/ArticleRSS/ArticleRSS";
import API from "../../api";

const HotTopicsSport = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchSport = async () => {
      const response = await fetch(`${API}/api/rss/top-news-poland/sport`);

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      if (response.ok) {
        // removing unwanted text
        const cleanedArticles = data.articles.map((article) => {
          // removing jpg string
          let cleanContent = article.content.replace(/<img[^>]*>/g, "");
          // removing cdata string
          cleanContent = cleanContent.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
          return { ...article, content: cleanContent };
        });

        setArticles(cleanedArticles);
        setLoading(false);
      }
    };

    fetchSport();
  }, []);

  return (
    <div>
      <h2>HOT Articles - SPORT</h2>
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

export default HotTopicsSport;
