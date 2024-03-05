import React from "react";

import makeApiRequest from "../api/makeApiRequest";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const handleLogin = async (loginPayload) => {
    const { token, user } = await makeApiRequest("/login", {
      method: 'POST',
      body: loginPayload,
    });

    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    user,
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
