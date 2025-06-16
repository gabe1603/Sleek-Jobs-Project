import { useState, useEffect } from "react";
import authService from "../services/authService";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [empresasIds, setEmpresasIds] = useState([]);

  // Inicializa o estado lendo do localStorage
  useEffect(() => {
    const storedIsAuth = localStorage.getItem("isAuth") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    const storedUserType = localStorage.getItem("userType") || "";
    const storedEmpresasIds = JSON.parse(localStorage.getItem("empresasIds") || "[]");

    setIsAuth(storedIsAuth);
    setUserName(storedUserName);
    setUserType(storedUserType);
    setEmpresasIds(storedEmpresasIds);
  }, []);

  const login = async (email, senha) => {
    try {
      const user = await authService.login(email, senha);
      setIsAuth(true);
      setUserName(user.nome);
      setUserType(user.tipo);
      if (user.tipo === "empregador") {
        setEmpresasIds(user.empresas || []);
        localStorage.setItem("empresasIds", JSON.stringify(user.empresas || []));
      } else {
        setEmpresasIds([]);
        localStorage.removeItem("empresasIds");
      }
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userName", user.nome);
      localStorage.setItem("userType", user.tipo);
      return { success: true, user };
    } catch (error) {
      console.error("Erro no login:", error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuth(false);
    setUserName("");
    setUserType("");
    setEmpresasIds([]);
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return { success: true, message: result.message };
    } catch (error) {
      console.error("Erro no registro:", error.message);
      return { success: false, error: error.message };
    }
  };

  return { isAuth, userName, userType, empresasIds, login, logout, register };
}; 