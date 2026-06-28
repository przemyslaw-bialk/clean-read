import { useState } from "react";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import FeedbackMessage from "../../components/FeedbackMessage/FeedbackMessage";
import { API } from "../../api";

const AddArticle = () => {
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setSuccess(false);

    if (!user || !user.token) {
      setError("You must be logged in to add article.");
      return;
    }
    const tagsArray = tags.split(" "); // CREATE ARRAY and separate words by space

    const article = { title, content, tags: tagsArray };

    const response = await fetch(`${API}/api/articles`, {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!user) {
      return;
    }

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.message || "Something went wrong!");
      setSuccess(false);
    }

    if (!title || !content) {
      setError("Please provide article title and article content!");
      setSuccess(false);
    }

    if (response.ok) {
      setMessage(data.message);
      setError(null);
      setSuccess(true);
      setTitle("");
      setContent("");
      setTags("");
      dispatch({ type: "CREATE_ARTICLE", payload: data });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <h3 className="article-form__header">Add new article</h3>

      <label className="article-form__label">Article title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="article-form__input"
      />

      <label className="article-form__label">Content:</label>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="article-form__textarea"
      />

      <label className="article-form__label">Tags:</label>
      <input
        type="text"
        onChange={(e) => setTags(e.target.value)}
        placeholder="ryby gry"
        value={tags}
        className="article-form__input"
      />

      <div className="article-form__button-wrapper">
        <button className="article-form__button article-form__button--primary">
          Add article
        </button>
      </div>
      {error && <div className="article-form__error">{error}</div>}
      {success && <FeedbackMessage message={message} />}
    </form>
  );
};

export default AddArticle;
