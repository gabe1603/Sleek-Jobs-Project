import { jobs } from "../mock/jobs";

const employerMock = {
  name: "Lucas Employer",
  email: "employer@company.com.au",
  company: "Sleek Training",
  abn: "12 345 678 901",
  role: "Tech Lead",
  logo: "https://randomuser.me/api/portraits/men/45.jpg"
};

const employerService = {
  getEmployer: () => employerMock,
  getJobsByEmployer: (company) => jobs.filter(j => j.empresa === company),
  // Futuramente: métodos para criar, editar, remover vagas, atualizar perfil, etc.
};

export default employerService; 