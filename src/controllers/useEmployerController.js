import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export function useEmployerController() {
  const { userId } = useAuth();
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newJob, setNewJob] = useState({
    titulo: "",
    salario: "",
    closeDate: "",
    descricao: "",
    imagem: "",
    contato: ""
  });
  const [loading, setLoading] = useState(true);
  const [applicantsDetails, setApplicantsDetails] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [userRes, jobsRes] = await Promise.all([
          api.get(`/users/${userId}`, { headers }),
          api.get(`/users/${userId}/jobs`, { headers })
        ]);

        setEmployer({
          ...userRes.data,
          name: userRes.data.name || userRes.data.nome || '',
          email: userRes.data.email || '',
          company: userRes.data.company || userRes.data.companyName || '',
          abn: userRes.data.abn || '',
          role: userRes.data.role || '',
          logo: userRes.data.logo || undefined,
        });

        setJobs(jobsRes.data);
        
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchData();
  }, [userId]);

  // Estatísticas
  const jobsCreated = jobs.length;
  const openJobs = jobs.length; 
  const applicantsReceived = jobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0);

  // CRUD
  const handleRemove = id => setJobs(jobs.filter(j => j.id !== id));
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewJob({ titulo: "", salario: "", closeDate: "", descricao: "", imagem: "", contato: "" });
  };
  const handleCreate = () => {
    setJobs([
      ...jobs,
      {
        ...newJob,
        id: Date.now(),
        empresa: employer.company
      }
    ]);
    handleClose();
  };

  const fetchApplicantDetails = async (applicantIds) => {
    if (!applicantIds || applicantIds.length === 0) {
      setApplicantsDetails([]);
      return;
    }
    setLoadingApplicants(true);
    const token = localStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const userPromises = applicantIds.map(id => api.get(`/users/${id}`, { headers }));
      const userResponses = await Promise.all(userPromises);
      const details = userResponses.map(res => res.data);
      setApplicantsDetails(details);
    } catch (error) {
      console.error("Failed to fetch applicant details", error);
      setApplicantsDetails([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  return {
    employer,
    jobs,
    jobsCreated,
    openJobs,
    applicantsReceived,
    handleRemove,
    handleOpen,
    handleClose,
    handleCreate,
    open,
    openEdit,
    setOpenEdit,
    newJob,
    setNewJob,
    loading,
    fetchApplicantDetails,
    applicantsDetails,
    loadingApplicants
  };
} 