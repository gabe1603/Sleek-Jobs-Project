import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [empresasIds, setEmpresasIds] = useState([]);
  const [isMockUser, setIsMockUser] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const storedIsAuth = !!token;
    const storedUserId = localStorage.getItem("userId") || "";
    const storedUserName = localStorage.getItem("userName") || "";
    const storedUserType = localStorage.getItem("userType") || "";
    const storedCompanyId = localStorage.getItem("companyId") || null;
    const storedEmpresasIds = JSON.parse(localStorage.getItem("empresasIds") || "[]");
    const storedIsMockUser = localStorage.getItem("isMockUser") === "true";
    const storedUser = localStorage.getItem("user");

    setIsAuth(storedIsAuth);
    setUserId(storedUserId);
    setUserName(storedUserName);
    setUserType(storedUserType);
    setCompanyId(storedCompanyId);
    setEmpresasIds(storedEmpresasIds);
    setIsMockUser(storedIsMockUser);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const login = async (email, senha) => {
    try {
      const user = await authService.login(email, senha);
      setIsAuth(true);
      setUserId(user.id || "");
      setUserName(user.name || user.nome);
      setUserType(
        user.role === 'admin' ? 'ADMIN' :
        user.role === 'employer' ? 'COMPANY' :
        user.role === 'student' ? 'CANDIDATE' :
        user.role || user.type || user.tipo
      );
      setCompanyId(user.companyId || null);
      setUser(user);
      const mock = user.email && user.email.includes('@mock');
      setIsMockUser(mock);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userId", user.id || "");
      localStorage.setItem("userName", user.name || user.nome);
      localStorage.setItem("userType",
        user.role === 'admin' ? 'ADMIN' :
        user.role === 'employer' ? 'COMPANY' :
        user.role === 'student' ? 'CANDIDATE' :
        user.role || user.type || user.tipo
      );
      localStorage.setItem("companyId", user.companyId || '');
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isMockUser", mock ? "true" : "false");
      if (user.tipo === "empregador") {
        setEmpresasIds(user.empresas || []);
        localStorage.setItem("empresasIds", JSON.stringify(user.empresas || []));
      } else {
        setEmpresasIds([]);
        localStorage.removeItem("empresasIds");
      }
      if (user.jwt) {
        localStorage.setItem('jwt', user.jwt);
        setIsAuth(true);
      }
      return { success: true, user };
    } catch (error) {
      console.error("Erro no login:", error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuth(false);
    setUserId("");
    setUserName("");
    setUserType("");
    setCompanyId(null);
    setEmpresasIds([]);
    setIsMockUser(false);
    setUser(null);
    localStorage.clear();
    localStorage.removeItem('jwt');
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

  return (
    <AuthContext.Provider value={{
      isAuth,
      userId,
      userName,
      userType,
      companyId,
      empresasIds,
      isMockUser,
      user,
      login,
      logout,
      register,
      setIsAuth,
      setUserId,
      setUserName,
      setUserType,
      setCompanyId,
      setEmpresasIds
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function parseJwt(token) {
  if (!token) return {};
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return {};
  }
} 