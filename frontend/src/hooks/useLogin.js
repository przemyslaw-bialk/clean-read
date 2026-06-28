import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import API from "../api";

const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const user = { email, password };

    const response = await fetch(`${API}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setIsLoading(false);
      setError(data.err);
      setSuccess(false);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      setSuccess(true);
    }
  };

  return { login, isLoading, error, success };
};

export default useLogin;
