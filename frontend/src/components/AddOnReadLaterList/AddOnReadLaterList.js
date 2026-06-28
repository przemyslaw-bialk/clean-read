import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import FeedbackMessage from "../FeedbackMessage/FeedbackMessage";
import { useReadLaterContext } from "../../hooks/useReadLaterContext";
import API from "../../api";

const AddOnReadLaterList = ({ article }) => {
  const { user } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const { dispatch } = useReadLaterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${API}/api/user/read-later/${article._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setSuccess(response.ok);
        dispatch({ type: "ADD_TO_READ_LATER_LIST", payload: data.favourites });
      }

      if (!response.ok) {
        setSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("You must be logged in to be able to add article");
      setSuccess(false);
    }
  };

  return (
    <>
      <button onClick={handleSubmit} className="add-read-later__button">
        Add on list
      </button>
      {message && <FeedbackMessage message={message} success={success} />}
    </>
  );
};

export default AddOnReadLaterList;
