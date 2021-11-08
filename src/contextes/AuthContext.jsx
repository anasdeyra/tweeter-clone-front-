import React, { useState, useEffect } from "react";
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    user: currentUser,
    setUser: setCurrentUser,
  };
  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("currentUser"));
    if (lsUser && Date.now() - lsUser?.loginTime > 0) {
      setCurrentUser(lsUser);
    } else localStorage.removeItem("currentUser");
  }, []);

  return <AuthContext.Provider value={value} children={children} />;
}

export function useAuth() {
  var Auth = null;
  var lsUser = localStorage.getItem("currentUser");
  if (lsUser) {
    Auth = JSON.parse(lsUser);
  }
  return Auth;
}
