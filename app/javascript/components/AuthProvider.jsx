import React from "react";

import makeApiRequest from "../api/makeApiRequest";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);

  const handleLogin = async (loginPayload) => {
    const { token } = await makeApiRequest("/login", {
      method: 'POST',
      body: loginPayload,
    });

    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
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
