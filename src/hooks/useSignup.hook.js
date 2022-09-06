import { useState } from "react";
import { useAuthContext } from "./useAuthContext.hook";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const SERVER_ADDRESS = "https://outdoor-voice.herokuapp.com";

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(SERVER_ADDRESS + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
