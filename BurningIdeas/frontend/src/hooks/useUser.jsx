import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const userId = localStorage.getItem("_id");
      const name = localStorage.getItem("name");
      const username = localStorage.getItem("username");

      setUser({ username, userId, name });
    } else {
      setUser(null);
    }
  }, []);

  return { user, isAuthenticated, setUser };
}
