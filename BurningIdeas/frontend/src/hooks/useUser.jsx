// import { useState, useEffect } from "react";

// export function useUser() {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authStatus = localStorage.getItem("isAuthenticated") === "true";
//     setIsAuthenticated(authStatus);

//     if (authStatus) {
//       const userId = localStorage.getItem("id");
//       const name = localStorage.getItem("name");
//       const username = localStorage.getItem("username");
//       const password = localStorage.getItem("password");

//       setUser({ userId, name, username, password });
//     } else {
//       setUser(null);
//     }
//   }, []);

//   return { user, isAuthenticated, setUser };
// }

import { useState, useEffect } from "react";

export function useUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return { user, isAuthenticated, setUser };
}
