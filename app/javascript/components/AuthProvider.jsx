import React from "react";

import makeApiRequest from "../api/makeApiRequest";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const handleLogin = async (loginPayload) => {
    const { error, user } = await makeApiRequest("/login", {
      method: 'POST',
      body: loginPayload,
    });

    if (error) {
      return { error };
    } else {
      setUser(user);
      return { error: null }
    }
  };

  const handleLogout = async () => {
    const { error } = await makeApiRequest("/logout", {
      method: 'DELETE'
    });

    if (error) {
      return { error };
    } else {
      setUser(null);
      return { error: null }
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
