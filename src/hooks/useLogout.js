import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setisPending(true);

    try {
      // logging out
      await signOut(auth);

      // dispatching logout
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setisPending(false);
        setError(null);
      }
      setisPending(false);
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setisPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  });
  return { logout, error, isPending };
};
