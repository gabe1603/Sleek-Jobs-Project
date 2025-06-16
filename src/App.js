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
import Cadastro from "./pages/Cadastro";
import DashboardCandidato from "./pages/DashboardCandidato";
import Empresas from "./pages/Empresas";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./controllers/useAuth";

function App() {
  const { isAuth, userName, userType, setIsAuth, setUserName, setUserType, empresasIds } = useAuth();

  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} userName={userName} setUserName={setUserName} userType={userType} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={isAuth && userType === "empregador" ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard-empregador"
          element={isAuth && userType === "empregador" ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard-candidato"
          element={isAuth && userType === "candidato" ? <DashboardCandidato /> : <Navigate to="/login" />}
        />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/empresas" element={<Empresas />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
