import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Card, Grid, CircularProgress, Avatar, Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from "@mui/material";
import jobService from "../services/jobService";
import api from "../services/api";
import { useAuth } from '../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';

export default function DashboardAdmin() {
  const { userId } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: '', email: '' });
  const [editProfileLoading, setEditProfileLoading] = useState(false);
  const [editProfileError, setEditProfileError] = useState('');
  const [editProfileSuccess, setEditProfileSuccess] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [avatarSuccess, setAvatarSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [jobToDelete, setJobToDelete] = useState(null);
  const [openApplicants, setOpenApplicants] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantsDetails, setApplicantsDetails] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwt');
        const headers = { Authorization: `Bearer ${token}` };
        // Buscar perfil do admin
        const userRes = await api.get(`/users/${userId}`, { headers });
        setAdmin(userRes.data);
        setEditProfile({ name: userRes.data.name || '', email: userRes.data.email || '' });
        // Buscar todos os usuários
        const usersRes = await api.get("/users", { headers });
        setUsers(usersRes.data);
        // Buscar todas as vagas
        const jobsRes = await jobService.getJobs();
        setJobs(jobsRes);
      } catch (err) {
        setAdmin(null);
        setUsers([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchData();
  }, [userId]);

  const handleEditProfile = async () => {
    setEditProfileLoading(true);
    setEditProfileError('');
    setEditProfileSuccess('');
    try {
      const updated = await jobService.updateUserProfile(userId, {
        name: editProfile.name,
        email: editProfile.email
      });
      setAdmin(prev => ({ ...prev, ...updated }));
      setEditProfileSuccess('Profile updated successfully!');
      setTimeout(() => setOpenEdit(false), 1200);
    } catch (err) {
      setEditProfileError(typeof err === 'string' ? err : 'Error updating profile');
    } finally {
      setEditProfileLoading(false);
    }
  };

  const handleUploadAvatar = async (file) => {
    setAvatarLoading(true);
    setAvatarError('');
    setAvatarSuccess('');
    try {
      const updated = await jobService.uploadUserAvatar(userId, file);
      setAdmin(prev => ({ ...prev, avatar: updated.avatar || updated.url || updated.path }));
      setAvatarSuccess('Avatar updated successfully!');
    } catch (err) {
      setAvatarError(typeof err === 'string' ? err : 'Error uploading avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    fetchApplicantDetails(job.applicants);
    setOpenApplicants(true);
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
      setApplicantsDetails([]);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const handleCloseApplicants = () => {
    setOpenApplicants(false);
    setSelectedJob(null);
    setApplicantsDetails([]);
  };

  const handleRemove = (jobId) => {
    setJobToDelete(jobId);
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

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 6 }}>
      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Card de Perfil do Admin */}
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Card sx={{ p: 4, borderRadius: 5, boxShadow: "0 4px 24px #0001", bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={admin?.avatar ? (admin.avatar.startsWith('http') ? admin.avatar : `${process.env.REACT_APP_IMAGE_URL}${admin.avatar}`) : undefined}
                crossOrigin="anonymous"
                alt={admin?.name}
                sx={{ width: 90, height: 90, mb: 2, border: '3px solid #6610f2' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{admin?.name}</Typography>
              <Typography sx={{ color: '#888', mb: 0.5 }}>Admin</Typography>
              <Typography sx={{ color: '#444', fontSize: 15, mb: 0.5 }}>{admin?.email}</Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: '#6610f2', color: '#6610f2', '&:hover': { borderColor: '#6610f2', bgcolor: '#f3e8ff' }, width: '100%' }}
                onClick={() => setOpenEdit(true)}
              >
                Edit Profile
              </Button>
            </Card>
          </Box>
          {/* Lista de Vagas */}
          <Box sx={{ flex: '2 1 600px', minWidth: 400 }}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>All Jobs</Typography>
              {jobs.length === 0 ? (
              <Typography color="text.secondary">You haven't posted any jobs yet.</Typography>
            ) : (
              jobs.map(job => (
                <Card key={job.id} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderRadius: 4, background: '#fff', boxShadow: '0 4px 18px #0001', gap: 2, mb: 2 }}>
                  <Avatar src={`${process.env.REACT_APP_IMAGE_URL}${job.image}`} crossOrigin="anonymous" alt="logo" sx={{ width: 56, height: 56, border: '2px solid #17c3b2' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{job.title}</Typography>
                    <Typography sx={{ color: '#6610f2', fontWeight: 500 }}>
                      {job.salaryMin && job.salaryMax
                        ? `AU$ ${job.salaryMin.toLocaleString()} - AU$ ${job.salaryMax.toLocaleString()}`
                        : 'Salário não informado'}
                    </Typography>
                    <Typography sx={{ color: '#888', fontSize: 14 }}>Status: Ativa</Typography>
                    <Typography sx={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Candidatos: {job.applicants?.length || 0}</Typography>
                  </Box>
                  <Button variant="outlined" color="secondary" sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', mr: 1 }} onClick={() => handleViewApplicants(job)}>View Applicants</Button>
                  <Button onClick={() => handleRemove(job.id)} color="error" variant="outlined" sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>Remove</Button>
                </Card>
              ))
            )}
            </Card>
          </Box>

          {/* Container de Usuários */}
          <Box sx={{ flex: '2 1 600px', minWidth: 400 }}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>All Users</Typography>
              {users.length === 0 ? (
                <Typography color="text.secondary">No users found.</Typography>
              ) : (
                users.map(user => (
                  <Box key={user.id} sx={{ mb: 2, p: 2, borderBottom: "1px solid #eee", display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${process.env.REACT_APP_IMAGE_URL}${user.avatar}`) : undefined}
                      alt={user.name}
                      sx={{ width: 56, height: 56, mr: 2, border: '2px solid #6610f2', bgcolor: '#f3e8ff', color: '#6610f2', fontWeight: 700 }}
                    >
                      {!user.avatar && user.name?.[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
                      <Typography sx={{ color: '#888', fontSize: 14 }}>{user.email}</Typography>
                      <Typography sx={{ color: '#6610f2', fontSize: 14, textTransform: 'capitalize' }}>{user.role}</Typography>
                      {user.abn && (
                        <Typography sx={{ color: '#888', fontSize: 13 }}>ABN: {user.abn}</Typography>
                      )}
                      {Array.isArray(user.skills) && user.skills.length > 0 && (
                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {user.skills.map(skill => (
                            <span key={skill.id} style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 8, padding: '2px 8px', fontSize: 12, fontWeight: 500 }}>{skill.name}</span>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </Card>
          </Box>
        </Box>
        {/* Modal de edição de perfil do admin */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
            <Avatar
              src={admin?.avatar}
              alt={editProfile.name}
              sx={{ width: 90, height: 90, mb: 2, border: '3px solid #6610f2' }}
            />
            <Button
              variant="outlined"
              sx={{ mb: 3 }}
              component="label"
              disabled={avatarLoading}
            >
              {avatarLoading ? 'Uploading...' : 'Change Avatar'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={e => {
                  if (e.target.files && e.target.files[0]) handleUploadAvatar(e.target.files[0]);
                }}
              />
            </Button>
            {avatarError && <Alert severity="error" sx={{ mb: 1, maxWidth: 400 }}>{avatarError}</Alert>}
            {avatarSuccess && <Alert severity="success" sx={{ mb: 1, maxWidth: 400 }}>{avatarSuccess}</Alert>}
            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 2, maxWidth: 400 }}
              value={editProfile.name}
              onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
              disabled={editProfileLoading}
            />
            <TextField
              fullWidth
              label="Email"
              sx={{ mb: 2, maxWidth: 400 }}
              value={editProfile.email}
              onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
              disabled={editProfileLoading}
            />
            {editProfileError && <Alert severity="error" sx={{ mt: 2, maxWidth: 400 }}>{editProfileError}</Alert>}
            {editProfileSuccess && <Alert severity="success" sx={{ mt: 2, maxWidth: 400 }}>{editProfileSuccess}</Alert>}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button onClick={() => setOpenEdit(false)} disabled={editProfileLoading}>Cancel</Button>
            <Button onClick={handleEditProfile} variant="contained" disabled={editProfileLoading}>
              {editProfileLoading ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Modal de confirmação de deleção de vaga */}
        <Dialog open={!!jobToDelete} onClose={cancelDeleteJob}>
          <DialogTitle>Delete Job</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this job? This action cannot be undone.</Typography>
            {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
            {deleteSuccess && <Alert severity="success" sx={{ mt: 2 }}>{deleteSuccess}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDeleteJob} disabled={deleteLoading}>Cancel</Button>
            <Button onClick={confirmDeleteJob} color="error" variant="contained" disabled={deleteLoading}>
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Modal de candidatos da vaga */}
        <Dialog open={openApplicants} onClose={handleCloseApplicants} maxWidth="sm" fullWidth>
          <DialogTitle>Applicants for: {selectedJob?.title}</DialogTitle>
          <DialogContent>
            {loadingApplicants ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : applicantsDetails.length === 0 ? (
              <Typography color="text.secondary">No applicants for this job yet.</Typography>
            ) : (
              applicantsDetails.map(applicant => (
                <Box key={applicant.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{applicant.name || applicant.nome}</Typography>
                  <Typography sx={{ color: '#888', fontSize: 15 }}>{applicant.email}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {Array.isArray(applicant.skills) && applicant.skills.map(skill => (
                      <span key={skill.id || skill.name} style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 8, padding: '2px 8px', fontSize: 12, fontWeight: 500 }}>{skill.name}</span>
                    ))}
                  </Box>
                </Box>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseApplicants}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
} 