import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./Footer";
import TopNavigation from "./TopNavigation";
import { Home, Sets } from "./pages"

const App = () =>
  <div className="App">
    <BrowserRouter>
      <TopNavigation />
      <div className="container main-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sets" element={<Sets />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </div>;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
});
