import { Link } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import { useLogout } from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import FeedbackMessage from "../FeedbackMessage/FeedbackMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useReadLaterContext } from "../../hooks/useReadLaterContext";
import { FaRegUserCircle, FaReadme } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import SearchArticle from "../SearchArticle/SearchArticle";
import { API } from "../../api";

const Navbar = () => {
  const [message, setMessage] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { readLaterList, dispatch } = useReadLaterContext();

  const countArticles = readLaterList?.length || 0;

  const handleClick = () => {
    logout();
    setMessage("logged out");
  };

  useEffect(() => {
    if (!user) return;
    const fetchReadLater = async () => {
      try {
        const response = await fetch(`${API}/api/user/read-later/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        dispatch({
          type: "GET_READ_LATER_LIST",
          payload: data.favourites,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchReadLater();
  }, [user, dispatch]);

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <Link to="/">
            <h1 className="navbar__title">CR</h1>
          </Link>

          {/* WHEN USER IS NOT L0GGED */}
          {!user && (
            <div className="navbar__auth-links">
              <div className="navbar__auth-icon">
                <MdLogin />
              </div>
              <div>
                <Link to="/signup" className="navbar__auth-link">
                  REGISTER
                </Link>
              </div>
              <div>
                <Link to="/login" className="navbar__auth-link">
                  LOG IN
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* WHEN USER IS L0GGED */}
        {user && (
          <div className="navbar__logged-user">
            <div className="navbar__info">
              <div className="navbar__user">
                <div className="navbar__icon">
                  <FaRegUserCircle />
                </div>
                <div className="navbar__name"> hello {user?.name} :) </div>
              </div>
              <div className="navbar__list">
                <div className="navbar__icon">
                  <FaReadme />
                </div>
                <div>
                  <Link to="user/read-later" className="navbar__link">
                    Reading List: {countArticles}
                  </Link>
                </div>
              </div>
            </div>
            <SearchArticle />

            <button onClick={handleClick} className="navbar__logout">
              log out
            </button>
          </div>
        )}
        <SideMenu />
      </header>
      {message && <FeedbackMessage message={message} />}
    </>
  );
};

export default Navbar;
