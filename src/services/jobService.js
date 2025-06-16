import { jobs } from "../mock/jobs";
import { empresas } from "../mock/empresas";
import { validateJob } from "../models/Job";

class JobServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'JobServiceError';
    this.code = code;
  }
}

const jobService = {
  getJobs: async (filters = {}) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredJobs = [...jobs];

          if (filters.searchTitle) {
            const searchTerm = filters.searchTitle.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
              job.titulo.toLowerCase().includes(searchTerm) ||
              (job.descricao && job.descricao.toLowerCase().includes(searchTerm))
            );
          }

          if (filters.searchLocation) {
            const searchLoc = filters.searchLocation.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
              job.local?.toLowerCase().includes(searchLoc) ||
              (searchLoc.trim() === "" || (searchLoc.toLowerCase() === "remoto" && job.local?.toLowerCase().includes("remoto")))
            );
          }

          if (filters.modelo) {
            filteredJobs = filteredJobs.filter(job => {
              if (filters.modelo === "Presencial") return !/remoto|híbrido/i.test(job.local);
              if (filters.modelo === "Remoto") return /remoto/i.test(job.local);
              if (filters.modelo === "Híbrido") return /híbrido/i.test(job.local);
              return true;
            });
          }

          if (filters.area) {
            filteredJobs = filteredJobs.filter(job => job.area && job.area === filters.area);
          }

          if (filters.contrato) {
            filteredJobs = filteredJobs.filter(job => job.contrato && job.contrato === filters.contrato);
          }

          if (filters.jornada) {
            filteredJobs = filteredJobs.filter(job => job.jornada && job.jornada === filters.jornada);
          }

          if (filters.senioridade) {
            filteredJobs = filteredJobs.filter(job => job.senioridade && job.senioridade === filters.senioridade);
          }

          if (filters.salario && (filters.salario[0] > 0 || filters.salario[1] < 25000)) {
            filteredJobs = filteredJobs.filter(job => {
              const match = job.salario?.match(/(\d+[.,]?\d*)/g);
              if (!match) return false;
              const min = parseInt(match[0].replace(/\D/g, ""));
              const max = match[1] ? parseInt(match[1].replace(/\D/g, "")) : min;
              return min <= filters.salario[1] && max >= filters.salario[0];
            });
          }

          if (filters.status) {
            filteredJobs = filteredJobs.filter(job => job.status === filters.status);
          }

          const jobsWithCompanyLogos = filteredJobs.map(job => {
            const company = empresas.find(emp => emp.nome === job.empresa);
            return { ...job, imagem: company ? company.logo : job.imagem };
          });

          resolve(jobsWithCompanyLogos);
        }, 300);
      });
    } catch (error) {
      throw new JobServiceError('Erro ao buscar vagas', 'FETCH_ERROR');
    }
  },

  getJobById: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const job = jobs.find(j => j.id === Number(id));
          if (job) {
            const company = empresas.find(emp => emp.nome === job.empresa);
            resolve({ ...job, imagem: company ? company.logo : job.imagem });
          } else {
            reject(new JobServiceError("Vaga não encontrada.", "NOT_FOUND"));
          }
        }, 300);
      });
    } catch (error) {
      throw new JobServiceError('Erro ao buscar vaga', 'FETCH_ERROR');
    }
  },

  createJob: async (jobData) => {
    try {
      const { isValid, errors } = validateJob(jobData);
      if (!isValid) {
        throw new JobServiceError('Dados da vaga inválidos', 'VALIDATION_ERROR', errors);
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          const newJob = {
            ...jobData,
            id: Math.max(...jobs.map(j => j.id)) + 1,
            dataPublicacao: new Date().toISOString(),
            status: 'ativo'
          };
          jobs.push(newJob);
          resolve(newJob);
        }, 300);
      });
    } catch (error) {
      if (error instanceof JobServiceError) throw error;
      throw new JobServiceError('Erro ao criar vaga', 'CREATE_ERROR');
    }
  },

  updateJob: async (id, jobData) => {
    try {
      const { isValid, errors } = validateJob(jobData);
      if (!isValid) {
        throw new JobServiceError('Dados da vaga inválidos', 'VALIDATION_ERROR', errors);
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = jobs.findIndex(j => j.id === Number(id));
          if (index === -1) {
            reject(new JobServiceError("Vaga não encontrada.", "NOT_FOUND"));
            return;
          }

          const updatedJob = {
            ...jobs[index],
            ...jobData,
            id: Number(id)
          };
          jobs[index] = updatedJob;
          resolve(updatedJob);
        }, 300);
      });
    } catch (error) {
      if (error instanceof JobServiceError) throw error;
      throw new JobServiceError('Erro ao atualizar vaga', 'UPDATE_ERROR');
    }
  },

  deleteJob: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = jobs.findIndex(j => j.id === Number(id));
          if (index === -1) {
            reject(new JobServiceError("Vaga não encontrada.", "NOT_FOUND"));
            return;
          }

          jobs.splice(index, 1);
          resolve({ success: true });
        }, 300);
      });
    } catch (error) {
      throw new JobServiceError('Erro ao deletar vaga', 'DELETE_ERROR');
    }
  }
};

export default jobService; 