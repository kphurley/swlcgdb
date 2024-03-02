import React, { useContext } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import AuthProvider, { AuthContext } from "./components/AuthProvider";
import Footer from "./components/Footer";
import TopNavigation from "./components/TopNavigation";

import * as Pages from "./pages";

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
            <Route path="/" element={<Pages.Home />} />
            <Route path="cards/:id" element={<Pages.Card />} />
            <Route path="createDeck" element={ 
              // <ProtectedRoute>
                <Pages.CreateDeck />
              // </ProtectedRoute>
            } />
            <Route path="decks/:id" element={<Pages.Deck />} />
            <Route path="editDeck/:id" element={ 
              // <ProtectedRoute>
                <Pages.EditDeck />
              // </ProtectedRoute>
            } />
            <Route path="forgotPassword" element={<Pages.ForgotPassword />} />
            <Route path="resetPassword/:token" element={<Pages.ResetPassword />} />
            <Route path="signIn" element={<Pages.Login />} />
            <Route path="register" element={<Pages.RegisterNewUser />} />
            <Route path="sets/:id" element={<Pages.Set />} />
            <Route path="sets" element={<Pages.Sets />} />
            <Route path="search/:searchString" element={<Pages.CardList />} />
            <Route path="myDecks" element={
              // <ProtectedRoute>
                <Pages.MyDecks />
              // </ProtectedRoute>
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
