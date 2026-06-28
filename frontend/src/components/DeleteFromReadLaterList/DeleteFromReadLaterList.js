import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useReadLaterContext } from "../../hooks/useReadLaterContext";
import { API } from "../../api";

const DeleteFromReadLaterList = ({ article }) => {
  const { user } = useAuthContext();
  const { dispatch } = useReadLaterContext();

  const handleDelete = async () => {
    const response = await fetch(`${API}/api/user/read-later/${article._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({
        type: "REMOVE_FROM_READ_LATER_LIST",
        payload: article,
      });
    } else {
      console.error("Failed to delete the article");
    }
  };

  return (
    <button onClick={handleDelete} className="delete-read-later">
      <FaTrash />
    </button>
  );
};

export default DeleteFromReadLaterList;
