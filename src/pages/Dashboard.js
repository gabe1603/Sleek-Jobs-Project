import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Card, Button, Avatar, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, Chip,
  Stack, Badge, CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEmployerController } from "../controllers/useEmployerController";
import { getAllSkills } from "../services/skillService";
import { NumericFormat } from 'react-number-format';

export default function Dashboard() {
  const {
    employer, jobs, jobsCreated, openJobs, applicantsReceived,
    handleRemove, handleOpen, handleClose, handleCreate, open, openEdit, setOpenEdit,
    newJob, setNewJob, loading, fetchApplicantDetails, applicantsDetails, loadingApplicants,
    createError, createSuccess, createLoading, editProfile, setEditProfile, editProfileLoading, editProfileError, editProfileSuccess, handleEditProfile, handleUploadAvatar, avatarLoading, avatarError, avatarSuccess,
    jobToDelete, confirmDeleteJob, cancelDeleteJob, deleteLoading, deleteError, deleteSuccess
  } = useEmployerController();

  const [openApplicants, setOpenApplicants] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    if (open) {
      getAllSkills().then(setSkillsList).catch(() => setSkillsList([]));
    }
  }, [open]);

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    fetchApplicantDetails(job.applicants);
    setOpenApplicants(true);
  };

  if (loading || !employer) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>

          {/* Card de Perfil */}
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Card sx={{ p: 4, borderRadius: 5, boxShadow: "0 4px 24px #0001", bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={
                    employer?.avatar
                      ? employer.avatar.startsWith('http')
                        ? employer.avatar
                        : `${process.env.REACT_APP_IMAGE_URL}${employer.avatar}`
                      : undefined
                  }
                  crossOrigin="anonymous"
                  alt={employer?.name}
                  sx={{ width: 90, height: 90, mb: 2, border: '3px solid #6610f2' }}
                />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{employer?.name}</Typography>
              <Typography sx={{ color: '#888', mb: 0.5 }}>
                {employer?.role === 'COMPANY' ? 'Employer' : employer?.role === 'ADMIN' ? 'Admin' : employer?.role === 'CANDIDATE' ? 'Student' : employer?.role}
              </Typography>
              <Typography sx={{ color: '#6610f2', fontWeight: 600, mb: 0.5 }}>{employer?.company}</Typography>
              <Typography sx={{ color: '#444', fontSize: 15, mb: 0.5 }}>{employer?.email}</Typography>
              <Typography sx={{ color: '#888', fontSize: 15, mb: 2 }}>ABN: {employer?.abn}</Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 2, width: '100%', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <WorkIcon sx={{ color: '#6610f2', mb: 0.5 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{jobsCreated}</Typography>
                  <Typography sx={{ color: '#888', fontSize: 13 }}>Jobs created</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#10B981', mb: 0.5 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{openJobs}</Typography>
                  <Typography sx={{ color: '#888', fontSize: 13 }}>Open jobs</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <GroupIcon sx={{ color: '#7C3AED', mb: 0.5 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{applicantsReceived}</Typography>
                  <Typography sx={{ color: '#888', fontSize: 13 }}>Applicants received</Typography>
                </Box>
              </Stack>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#6610f2',
                  color: '#6610f2',
                  '&:hover': { borderColor: '#6610f2', bgcolor: '#f3e8ff' },
                  width: '100%'
                }}
                onClick={() => setOpenEdit(true)}
              >
                Edit Profile
              </Button>
            </Card>
          </Box>

          {/* Lista de Vagas */}
          <Box sx={{ flex: '2 1 600px', minWidth: 400 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#222' }}>Jobs Created</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  bgcolor: '#6610f2',
                  '&:hover': { bgcolor: '#5b21b6' }
                }}
                onClick={handleOpen}
              >
                Create New Job
              </Button>
            </Box>

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
          </Box>

        </Box>
      </Container>

      {/* Dialogs */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
          <Avatar
            src={employer?.avatar || employer?.logo}
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
          {employer?.role === 'COMPANY' && (
            <TextField
              fullWidth
              label="ABN"
              sx={{ mb: 2, maxWidth: 400 }}
              value={editProfile.abn}
              onChange={e => setEditProfile({ ...editProfile, abn: e.target.value })}
              disabled={editProfileLoading}
            />
          )}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new job</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth margin="normal" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
          <TextField label="Description" fullWidth multiline rows={3} margin="normal" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} />
          <TextField
            label="Minimum Salary Per Year"
            fullWidth
            margin="normal"
            value={newJob.salaryMin}
            onChange={e => setNewJob({ ...newJob, salaryMin: e.target.value })}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField
            label="Maximum Salary Per Year"
            fullWidth
            margin="normal"
            value={newJob.salaryMax}
            onChange={e => setNewJob({ ...newJob, salaryMax: e.target.value })}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField label="Closing Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={newJob.closeDate} onChange={e => setNewJob({ ...newJob, closeDate: e.target.value })} />
          <TextField label="Location (City, State or Remote)" fullWidth margin="normal" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={newJob.type}
              label="Type"
              onChange={e => setNewJob({ ...newJob, type: e.target.value })}
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="skills-label">Skills</InputLabel>
            <Select
              labelId="skills-label"
              multiple
              value={newJob.skills}
              onChange={e => setNewJob({ ...newJob, skills: e.target.value })}
              input={<OutlinedInput label="Skills" />}
              renderValue={selected => skillsList.filter(s => selected.includes(s.id)).map(s => s.name).join(', ')}
            >
              {skillsList.map(skill => (
                <MenuItem key={skill.id} value={skill.id}>
                  <Checkbox checked={newJob.skills.indexOf(skill.id) > -1} />
                  <ListItemText primary={skill.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 1 }}
          >
            {newJob.image ? newJob.image.name : "Select image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => setNewJob({ ...newJob, image: e.target.files[0] })}
            />
          </Button>
          {createError && <Alert severity="error" sx={{ mt: 2 }}>{createError}</Alert>}
          {createSuccess && <Alert severity="success" sx={{ mt: 2 }}>{createSuccess}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={createLoading}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" disabled={createLoading}>
            {createLoading ? "Sending..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openApplicants} onClose={() => setOpenApplicants(false)} maxWidth="sm" fullWidth>
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
                    <Chip key={skill.id || skill.name} label={skill.name} size="small" color="primary" />
                  ))}
                </Box>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplicants(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator="," decimalSeparator="."
      allowNegative={false}
      isNumericString
      prefix="AU$ "
    />
  );
}
