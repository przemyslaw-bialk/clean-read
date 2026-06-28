import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import ReadLaterArticleDetail from "../../components/ReadLaterArticleDetail/ReadLaterArticleDetail";
import { useReadLaterContext } from "../../hooks/useReadLaterContext";
import Loader from "../../utils/Loader/Loader";
import { API } from "../../api";

const ReadLaterList = () => {
  const { user } = useAuthContext();
  const { readLaterList, dispatch } = useReadLaterContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/user/read-later/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        dispatch({
          type: "GET_READ_LATER_LIST",
          payload: data.favourites,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user.token, dispatch]);

  return (
    <div>
      <h2>Your Articles</h2>
      <div>
        {loading ? (
          <Loader />
        ) : readLaterList.length > 0 ? (
          readLaterList.map((article) => (
            <div key={article._id}>
              <ReadLaterArticleDetail article={article} />
            </div>
          ))
        ) : (
          <p>hey! add some article first :)</p>
        )}
      </div>
    </div>
  );
};

export default ReadLaterList;
