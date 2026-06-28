import { useState } from "react";
import FeedbackMessage from "../../components/FeedbackMessage/FeedbackMessage";
import { API } from "../../api";

const validator = require("validator");

const Contact = () => {
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!validator.isEmail(email)) {
      setFeedback("incorrect mail!");
      return;
    }

    const response = await fetch(`${API}/api/contact`, {
      method: "POST",
      body: JSON.stringify({ email, userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setEmail("");
      setUserMessage("");
      setFeedback(data.message);
    }

    if (!response.ok) {
      setFeedback(data.message);
    }
  };

  return (
    <form className="contact" onSubmit={handleSubmit}>
      <h3 className="contact__header">Contact us</h3>
      <label className="contact__label">Your email</label>
      <input
        className="contact__input"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="contact__label">Message</label>
      <textarea
        className="contact__textarea"
        type="text"
        onChange={(e) => setUserMessage(e.target.value)}
        value={userMessage}
      />
      <button className="contact__button contact__button--primary">
        send message
      </button>
      {feedback && <FeedbackMessage message={feedback} />}
    </form>
  );
};

export default Contact;
