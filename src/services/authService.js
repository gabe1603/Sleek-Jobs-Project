import { usuarios } from "../mock/usuarios";
import api from './api';

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

const authService = {
  login: async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, password: senha });
      const user = response.data;
      const token = user.jwt;
      const payload = parseJwt(token);
      // Enriquecer o user com role e companyId do JWT
      return {
        ...user,
        role: payload.role,
        companyId: payload.companyId,
        jwt: token
      };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    localStorage.removeItem("empresasIds");
  },

  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular um registro bem-sucedido
        // Em um app real, você adicionaria o usuário ao array de mocks e ao localStorage
        console.log("Usuário mockado registrado:", userData);
        resolve({ success: true, message: "Cadastro realizado com sucesso!" });
      }, 500);
    });
  }
};

export default authService; 