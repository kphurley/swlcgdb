import React, { useContext } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import AuthProvider, { AuthContext } from "./components/AuthProvider";
import Footer from "./components/Footer";
import TopNavigation from "./components/TopNavigation";

import { Card, CardList, Deck, Home, Login, MyDecks, RegisterNewUser, Set, Sets } from "./pages";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

const App = () =>
  <AuthProvider>
    <div className="App">
      <BrowserRouter>
        <TopNavigation />
        <div className="container main-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cards/:id" element={<Card />} />
            <Route path="decks/:id" element={<Deck />} />
            <Route path="signIn" element={<Login />} />
            <Route path="register" element={<RegisterNewUser />} />
            <Route path="sets/:id" element={<Set />} />
            <Route path="sets" element={<Sets />} />
            <Route path="search/:searchString" element={<CardList />} />
            <Route path="myDecks" element={
              <ProtectedRoute>
                <MyDecks />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  </AuthProvider>;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
});
