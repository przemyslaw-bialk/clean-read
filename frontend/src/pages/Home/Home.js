import { useEffect, useState } from "react";
import ArticleDetails from "../../components/ArticleDetails/ArticleDetails";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../utils/Loader/Loader";
import API from "../../api";

const Home = () => {
  const { articles, dispatch } = useArticlesContext();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const articlesPerPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API}/api/articles?page=${page}`);
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_ARTICLES", payload: data });
          setHasMore(data.length === articlesPerPage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div>
        <Loader />
        <p style={{ color: "red" }}>
          Cold start: please wait approx. 40s! info for recruiters :)
        </p>
        <p>for login please use:</p>
        <p>login: test@test.com</p>
        <p>password: test</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="article">
        {articles?.map((article) => (
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
