import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setisPending(true);

    try {
      // logging in
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await // dispatching logout
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setisPending(false);
        setError(null);
      }
      setisPending(false);
    } catch (error) {
      setError(error.message);
      setisPending(false);
      if (!isCancelled) {
        setError(error.message);
        setisPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  });
  return { login, error, isPending };
};
