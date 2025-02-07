import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const userId = localStorage.getItem("userId");
      const name = localStorage.getItem("name");
      const username = localStorage.getItem("username");
      const profilepicture = localStorage.getItem("profilepicture");

      setUser({ username, userId, name, profilepicture });
    }
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("isAuthenticated");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("name");
  //   localStorage.removeItem("profilePicture");
  //   setUser(null);
  //   setIsAuthenticated(false);
  // };

  return { user, isAuthenticated, setUser };
};

export default useUser;
