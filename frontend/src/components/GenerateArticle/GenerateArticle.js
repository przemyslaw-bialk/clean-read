import API from "../../api";

const GenerateArticle = () => {
  const handleGenerate = async () => {
    try {
      const response = await fetch(`${API}/api/ai/generate-article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Błąd: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Wygenerowany artykuł:", data);
    } catch (error) {
      console.error("Błąd podczas generowania artykułu:", error);
    }
  };

  return <button onClick={handleGenerate}>Generate Article</button>;
};

export default GenerateArticle;
