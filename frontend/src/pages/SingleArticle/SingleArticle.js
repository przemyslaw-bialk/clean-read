import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorInfo from "../../utils/ErrorInfo";
import { Link } from "react-router-dom";
import { API } from "../../api";

const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API}/api/articles/${id}`);
        const data = await response.json();

        if (response.ok) {
          setArticle(data);
          setError("");
          console.log(data);
        } else {
          setError(data.error || "Can't download the article :(");
        }
      } catch (e) {
        setError("Can't connect to server :( Try again later");
      }
    };

    fetchArticle();
  }, [id]);

  const formatContent = (content) => {
    //getting strings as single words in array
    const words = content.trim().split(/\s+/);
    let formattedContent = [];
    let currentText = [];
    let wordCount = 0;

    words.forEach((word, index) => {
      currentText.push(word);
      wordCount++;

      // Sprawdzamy, czy liczba słów jest w przedziale 190-230 i czy ostatnia litera to kropka
      if (wordCount >= 190 && wordCount <= 230) {
        const lastWord = currentText[currentText.length - 1];
        if (lastWord.charAt(lastWord.length - 1) === ".") {
          //changing array to word
          formattedContent.push(currentText.join(" "));
          formattedContent.push("<br /> <br />");
          currentText = []; // Zaczynamy nową sekcję
          wordCount = 0; // Resetujemy licznik słów
        }
      }
    });

    if (currentText.length > 0) {
      formattedContent.push(currentText.join(" "));
    }

    return formattedContent.join(" ");
  };

  return (
    <div className="single-article">
      {article && (
        <>
          <h1>{article.title}</h1>
          <p
            className="single-article__content"
            dangerouslySetInnerHTML={{
              __html: formatContent(article.content),
            }}
          />
          <div className="single-article__tags">
            {article.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/tags/${tag}`}
                className="single-article__tag"
              >
                {tag}
              </Link>
            ))}
          </div>
        </>
      )}
      {error && <ErrorInfo error={error} />}
    </div>
  );
};

export default SingleArticle;
