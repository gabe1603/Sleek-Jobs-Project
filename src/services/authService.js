import { usuarios } from "../mock/usuarios";

const authService = {
  login: async (email, senha) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = usuarios.find(u => u.email === email && u.senha === senha);
        if (user) {
          resolve(user);
        } else {
          reject(new Error("E-mail ou senha inválidos."));
        }
      }, 500);
    });
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