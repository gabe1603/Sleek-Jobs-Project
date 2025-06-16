import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import About from "./pages/About";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // Mock de autenticação (usar contexto futuramente)
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
