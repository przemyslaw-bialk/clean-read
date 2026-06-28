import { useState } from "react";
import Modal from "../Modal/Modal";
import API from "../../api";

const SearchArticle = () => {
  const [searchText, setSearchText] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim()) {
      setError("");
      setSearchText("");

      try {
        const response = await fetch(
          `${API}/api/articles/search?q=${searchText}`,
        );
        const data = await response.json();

        if (response.ok) {
          setArticles(data);
          setIsModalOpen(true);
        } else {
          setError("couldnt get results");
        }
      } catch (error) {
        setError("error");
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // run function on ENTER BUTTON
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-article">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        placeholder="search article..."
        className="search-article__input"
      />
      <button onClick={handleSearch} className="search-article__button">
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        articles={articles}
      />
    </div>
  );
};

export default SearchArticle;
