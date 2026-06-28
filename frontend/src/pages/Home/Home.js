import { useEffect, useState } from "react";
import ArticleDetails from "../../components/ArticleDetails/ArticleDetails";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import Pagination from "../../components/Pagination/Pagination";
import GenerateArticle from "../../components/GenerateArticle/GenerateArticle";
import { API } from "../../api";

const Home = () => {
  const { articles, dispatch } = useArticlesContext();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const articlesPerPage = 10;

  //    `https://host559218.xce.pl/api/articles?page=${page}`
  useEffect(() => {
    const fetchArticles = async () => {
      const respone = await fetch(`${API}/api/articles?page=${page}`);
      const data = await respone.json();

      if (respone.ok) {
        dispatch({ type: "SET_ARTICLES", payload: data });
        setHasMore(data.length === articlesPerPage);
      }
    };

    fetchArticles();
  }, [dispatch, page]);

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className="home">
      <GenerateArticle />
      <div className="article">
        {articles &&
          articles.map((article) => (
            <ArticleDetails key={article._id} article={article} />
          ))}
      </div>
      <Pagination
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        page={page}
        hasMore={hasMore}
      />
    </div>
  );
};

export default Home;
