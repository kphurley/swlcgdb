import React from "react";
import { Navigate } from "react-router-dom";

import makeApiRequest from "../api/makeApiRequest";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const handleLogin = async (loginPayload) => {
    const { user } = await makeApiRequest("/login", {
      method: 'POST',
      body: loginPayload,
    });

    setUser(user);
  };

  const handleLogout = async () => {
    const { error } = await makeApiRequest("/logout", {
      method: 'DELETE'
    });

    if (error) {
      console.log("There was an error logging out")
    } else {
      setUser(null);
    }
  };

  // Only use this in situations where we're refreshing the page and have a valid cookie
  // Otherwise it will fail
  const assignUser = async () => {
    const { error, user } = await makeApiRequest('/me');

    if (error) {
      handleLogout();
    } else {
      setUser(user);
    }
  };

  const value = {
    user,
    assignUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
