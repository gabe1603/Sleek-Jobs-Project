import { empresas } from "../mock/empresas";

const companyService = {
  getCompanies: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredCompanies = empresas;

        // Exemplo de filtro (pode ser expandido se necessário)
        if (filters.name) {
          const searchTerm = filters.name.toLowerCase();
          filteredCompanies = filteredCompanies.filter(company =>
            company.nome.toLowerCase().includes(searchTerm)
          );
        }

        resolve(filteredCompanies);
      }, 300);
    });
  },

  getCompanyById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const company = empresas.find(c => c.id === Number(id));
        if (company) {
          resolve(company);
        } else {
          reject(new Error("Empresa não encontrada."));
        }
      }, 300);
    });
  }
};

export default companyService; 