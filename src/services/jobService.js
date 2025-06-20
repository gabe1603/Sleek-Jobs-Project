import { jobs } from "../mock/jobs";
import { validateJob } from "../models/Job";
import api from './api';
import { jobs as mockJobs } from '../mock/jobs';

class JobServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'JobServiceError';
    this.code = code;
  }
}

function isMockUser() {
  return localStorage.getItem('isAuth') === 'true' && localStorage.getItem('isMockUser') === 'true';
}

const jobService = {
  getJobs: async (filters = {}) => {
    if (isMockUser()) {
      // Lógica mockada (mantém como está)
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredJobs = [...mockJobs];
          // ... (restante da lógica de filtro mockada)
          if (filters.searchTitle) {
            const searchTerm = filters.searchTitle.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
              job.titulo.toLowerCase().includes(searchTerm) ||
              (job.resumo && job.resumo.toLowerCase().includes(searchTerm))
            );
          }
          if (filters.searchLocation) {
            const searchLoc = filters.searchLocation.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
              job.local?.toLowerCase().includes(searchLoc) ||
              (searchLoc.trim() === "" || (searchLoc.toLowerCase() === "remote" && job.local?.toLowerCase().includes("remote")))
            );
          }
          if (filters.modelo) {
            filteredJobs = filteredJobs.filter(job => {
              const jobLocation = job.local?.toLowerCase() || '';
              const filterModel = filters.modelo.toLowerCase();
              if (filterModel === 'remote') return jobLocation.includes('remote');
              if (filterModel === 'hybrid') return jobLocation.includes('hybrid');
              if (filterModel === 'on-site') return !jobLocation.includes('remote') && !jobLocation.includes('hybrid');
              return true;
            });
          }
          if (filters.area) {
            filteredJobs = filteredJobs.filter(job => job.area && job.area.toLowerCase() === filters.area.toLowerCase());
          }
          if (filters.contrato) {
            filteredJobs = filteredJobs.filter(job => {
              const jobText = `${job.titulo} ${job.resumo}`.toLowerCase();
              const filterContrato = filters.contrato.toLowerCase();
              if (filterContrato === 'full-time') return jobText.includes('full-time') || jobText.includes('full time');
              if (filterContrato === 'part-time') return jobText.includes('part-time') || jobText.includes('part time');
              if (filterContrato === 'contract') return jobText.includes('contract') || jobText.includes('contractor');
              if (filterContrato === 'internship') return jobText.includes('intern') || jobText.includes('internship');
              return true;
            });
          }
          if (filters.jornada) {
            filteredJobs = filteredJobs.filter(job => {
              const jobText = `${job.titulo} ${job.resumo}`.toLowerCase();
              const filterJornada = filters.jornada.toLowerCase();
              if (filterJornada === 'full-time') return jobText.includes('full-time') || jobText.includes('full time');
              if (filterJornada === 'part-time') return jobText.includes('part-time') || jobText.includes('part time');
              return true;
            });
          }
          if (filters.senioridade) {
            filteredJobs = filteredJobs.filter(job => {
              const jobText = `${job.titulo} ${job.resumo}`.toLowerCase();
              const filterSenioridade = filters.senioridade.toLowerCase();
              if (filterSenioridade === 'intern') return jobText.includes('intern') || jobText.includes('internship');
              if (filterSenioridade === 'junior') return jobText.includes('junior');
              if (filterSenioridade === 'mid-level') return jobText.includes('mid-level') || jobText.includes('mid level') || jobText.includes('intermediate');
              if (filterSenioridade === 'senior') return jobText.includes('senior');
              if (filterSenioridade === 'specialist') return jobText.includes('specialist') || jobText.includes('expert');
              return true;
            });
          }
          if (filters.salario && (filters.salario[0] > 0 || filters.salario[1] < 250000)) {
            filteredJobs = filteredJobs.filter(job => {
              const match = job.salario?.match(/AU\$ (\d{1,3}(?:,\d{3})*) - AU\$ (\d{1,3}(?:,\d{3})*)/);
              if (!match) return false;
              const min = parseInt(match[1].replace(/,/g, ""));
              const max = parseInt(match[2].replace(/,/g, ""));
              return min <= filters.salario[1] && max >= filters.salario[0];
            });
          }
          if (filters.status) {
            filteredJobs = filteredJobs.filter(job => job.status === filters.status);
          }
          const jobsWithSleekLogo = filteredJobs.map(job => ({
            ...job,
            imagem: "/logo512.png"
          }));
          resolve(jobsWithSleekLogo);
        }, 300);
      });
    }
    // API real
    try {
      const params = {};
      if (filters.searchTitle) params.title = filters.searchTitle;
      if (filters.searchLocation) params.location = filters.searchLocation;
      if (filters.modelo) params.work_model = filters.modelo;
      if (filters.area) params.area = filters.area;
      if (filters.contrato) params.contract_type = filters.contrato;
      if (filters.jornada) params.jornada = filters.jornada;
      if (filters.senioridade) params.seniority = filters.senioridade;
      if (filters.salario) params.salary = filters.salario;
      if (filters.status) params.status = filters.status;
      const response = await api.get('/jobs', { params });
      return response.data;
    } catch (error) {
      throw new JobServiceError('Error fetching jobs', 'FETCH_ERROR');
    }
  },

  getJobById: async (id) => {
    if (isMockUser()) {
      return mockJobs.find(j => j.id === Number(id));
    }
    try {
      const response = await api.get(`${process.env.REACT_APP_API_URL}/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar vaga:', error);
      throw error;
    }
  },

  createJob: async ({ title, description, location, type, salaryMin, salaryMax, closeDate, skills, image }) => {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('salaryMin', salaryMin);
    formData.append('salaryMax', salaryMax);
    if (closeDate) formData.append('closeDate', closeDate);
    if (Array.isArray(skills)) {
      formData.append('skills', JSON.stringify(skills));
    }
    if (image) formData.append('image', image);
    try {
      const response = await api.post('/jobs', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error creating job';
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
    const token = localStorage.getItem('jwt');
    try {
      const response = await api.delete(`/jobs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error deleting job';
    }
  },

  getAllJobs: async () => {
    if (isMockUser()) {
      return mockJobs;
    }
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      throw error;
    }
  },

  applyToJob: async (jobId, applicationData) => {
    if (isMockUser()) {
      return { success: true, message: 'Aplicação mockada enviada!' };
    }
    try {
      const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Erro ao aplicar para vaga:', error);
      throw error;
    }
  },

  updateUserProfile: async (userId, data) => {
    const token = localStorage.getItem('jwt');
    if (isMockUser()) {
      // Atualiza mock local (opcional, pode ser só resolve)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...data, id: userId });
        }, 400);
      });
    }
    try {
      const response = await api.patch(`/users/${userId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao atualizar perfil';
    }
  },

  uploadUserAvatar: async (userId, file) => {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const response = await api.post(`/users/${userId}/avatar`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error uploading avatar';
    }
  },

  registerUser: async ({ name, email, password, role }) => {
    try {
      const response = await api.post('/users/register', { name, email, password, role });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error registering user';
    }
  },

  createCompany: async ({ name, location, description, website, logo }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    if (description) formData.append('description', description);
    if (website) formData.append('website', website);
    if (logo) formData.append('logo', logo);
    try {
      const response = await api.post('/companies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error creating company';
    }
  }
};

export default jobService; 