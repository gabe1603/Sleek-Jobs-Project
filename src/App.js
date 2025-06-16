import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empresas" element={<Empresas />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedUserTypes={["empregador"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-empregador"
            element={
              <ProtectedRoute allowedUserTypes={["empregador"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-candidato"
            element={
              <ProtectedRoute allowedUserTypes={["candidato"]}>
                <DashboardCandidato />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
