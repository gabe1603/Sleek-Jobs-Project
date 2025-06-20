import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import jobService from "../services/jobService";

export function useEmployerController() {
  const { userId } = useAuth();
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full time",
    salaryMin: "",
    salaryMax: "",
    closeDate: "",
    skills: [],
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [applicantsDetails, setApplicantsDetails] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");
  const [editProfile, setEditProfile] = useState({ name: '', email: '', abn: '' });
  const [editProfileLoading, setEditProfileLoading] = useState(false);
  const [editProfileError, setEditProfileError] = useState('');
  const [editProfileSuccess, setEditProfileSuccess] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [avatarSuccess, setAvatarSuccess] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [jobToDelete, setJobToDelete] = useState(null);

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
  const handleRemove = async (id) => {
    setJobToDelete(id);
  };

  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;
    setDeleteLoading(true);
    setDeleteError('');
    setDeleteSuccess('');
    try {
      await jobService.deleteJob(jobToDelete);
      setJobs(prev => prev.filter(j => j.id !== jobToDelete));
      setDeleteSuccess('Job deleted successfully!');
      setTimeout(() => {
        setJobToDelete(null);
        setDeleteSuccess('');
      }, 1200);
    } catch (err) {
      setDeleteError(typeof err === 'string' ? err : 'Error deleting job');
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDeleteJob = () => {
    setJobToDelete(null);
    setDeleteError('');
    setDeleteSuccess('');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewJob({ title: "", description: "", location: "", type: "Full time", salaryMin: "", salaryMax: "", closeDate: "", skills: [], image: null });
    setCreateError("");
    setCreateSuccess("");
  };
  const handleCreate = async () => {
    setCreateLoading(true);
    setCreateError("");
    setCreateSuccess("");
    try {
      const job = await jobService.createJob({
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        type: newJob.type,
        salaryMin: newJob.salaryMin,
        salaryMax: newJob.salaryMax,
        closeDate: newJob.closeDate,
        skills: newJob.skills,
        image: newJob.image
      });
      setJobs(prev => [job, ...prev]);
      setCreateSuccess("Job created successfully!");
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (err) {
      setCreateError(typeof err === 'string' ? err : 'Error creating job');
    } finally {
      setCreateLoading(false);
    }
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

  const handleEditProfile = async () => {
    setEditProfileLoading(true);
    setEditProfileError('');
    setEditProfileSuccess('');
    try {
      const updated = await jobService.updateUserProfile(userId, {
        name: editProfile.name,
        email: editProfile.email,
        abn: employer?.role === 'COMPANY' ? editProfile.abn : undefined
      });
      setEmployer(prev => ({ ...prev, ...updated }));
      setEditProfileSuccess('Profile updated successfully!');
      setTimeout(() => setOpenEdit(false), 1200);
    } catch (err) {
      setEditProfileError(typeof err === 'string' ? err : 'Error updating profile');
    } finally {
      setEditProfileLoading(false);
    }
  };

  useEffect(() => {
    if (openEdit && employer) {
      setEditProfile({
        name: employer.name || '',
        email: employer.email || '',
        abn: employer.abn || ''
      });
    }
  }, [openEdit, employer]);

  const handleUploadAvatar = async (file) => {
    setAvatarLoading(true);
    setAvatarError('');
    setAvatarSuccess('');
    try {
      const updated = await jobService.uploadUserAvatar(userId, file);
      setEmployer(prev => ({ ...prev, avatar: updated.avatar || updated.url || updated.path }));
      setAvatarSuccess('Avatar updated successfully!');
    } catch (err) {
      setAvatarError(typeof err === 'string' ? err : 'Error uploading avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  return {
    employer,
    jobs,
    jobsCreated,
    openJobs,
    applicantsReceived,
    handleRemove,
    jobToDelete,
    confirmDeleteJob,
    cancelDeleteJob,
    deleteLoading,
    deleteError,
    deleteSuccess,
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
    loadingApplicants,
    createLoading,
    createError,
    createSuccess,
    editProfile, setEditProfile,
    editProfileLoading, editProfileError, editProfileSuccess,
    handleEditProfile,
    avatarLoading, avatarError, avatarSuccess, handleUploadAvatar
  };
} 