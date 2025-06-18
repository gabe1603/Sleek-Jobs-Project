import React, { useState } from "react";
import { Container, Typography, Box, Card, Button, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Grid, Stack, Badge } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { jobs as mockJobs } from "../mock/jobs";

// Mock de dados do empregador
const employerMock = {
  name: "Lucas Employer",
  email: "employer@company.com.au",
  company: "Sleek Training",
  abn: "12 345 678 901",
  role: "Tech Lead",
  logo: "https://randomuser.me/api/portraits/men/45.jpg"
};

export default function Dashboard() {
  // Simula que o empregador logado é sempre "Sleek Training"
  const employer = employerMock.company;
  const [jobs, setJobs] = useState(mockJobs.filter(j => j.empresa === employer));
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

  // Estatísticas mock
  const jobsCreated = jobs.length;
  const openJobs = jobs.filter(j => new Date(j.closeDate) > new Date()).length;
  const applicantsReceived = jobs.reduce((acc, job) => acc + (job.candidatos || Math.floor(Math.random() * 12 + 1)), 0);

  // Simple CRUD (mock)
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
        empresa: employer
      }
    ]);
    handleClose();
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 6
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Perfil do empregador */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, borderRadius: 5, boxShadow: "0 4px 24px #0001", bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Badge badgeContent={<Chip label="Employer" color="success" size="small" sx={{ fontWeight: 700, fontSize: 13, px: 1.5 }} />} overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Avatar src={employerMock.logo} alt={employerMock.name} sx={{ width: 90, height: 90, mb: 2, border: '3px solid #6610f2' }} />
              </Badge>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{employerMock.name}</Typography>
              <Typography sx={{ color: '#888', mb: 0.5 }}>{employerMock.role}</Typography>
              <Typography sx={{ color: '#6610f2', fontWeight: 600, mb: 0.5 }}>{employerMock.company}</Typography>
              <Typography sx={{ color: '#444', fontSize: 15, mb: 0.5 }}>{employerMock.email}</Typography>
              <Typography sx={{ color: '#888', fontSize: 15, mb: 2 }}>ABN: {employerMock.abn}</Typography>
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
              <Button variant="outlined" startIcon={<EditIcon />} sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: '#6610f2', color: '#6610f2', '&:hover': { borderColor: '#6610f2', bgcolor: '#f3e8ff' }, width: '100%' }} onClick={() => setOpenEdit(true)}>
                Edit Profile
              </Button>
            </Card>
          </Grid>
          {/* Lista de vagas */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#222' }}>Jobs Created</Typography>
              <Button variant="contained" startIcon={<AddIcon />} color="primary" sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', bgcolor: '#6610f2', '&:hover': { bgcolor: '#5b21b6' } }} onClick={handleOpen}>
                Create New Job
              </Button>
            </Box>
            {jobs.length === 0 ? (
              <Typography color="text.secondary">You haven't posted any jobs yet.</Typography>
            ) : (
              <Grid container spacing={3}>
                {jobs.map(job => (
                  <Grid item xs={12} md={6} key={job.id}>
                    <Card sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2, borderRadius: 4, background: '#fff', boxShadow: '0 4px 18px #0001', gap: 2 }}>
                      <Avatar src={job.imagem} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #17c3b2' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{job.titulo}</Typography>
                        <Typography sx={{ color: '#6610f2', fontWeight: 500 }}>{job.salario}</Typography>
                        <Typography sx={{ color: '#888', fontSize: 14 }}>Status: {new Date(job.closeDate) > new Date() ? 'Open' : 'Closed'}</Typography>
                        <Typography sx={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Applicants: {job.candidatos || Math.floor(Math.random() * 12 + 1)}</Typography>
                      </Box>
                      <Button variant="outlined" color="secondary" sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', mr: 1 }}>
                        View Applicants
                      </Button>
                      <Button onClick={() => handleRemove(job.id)} color="error" variant="outlined" sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none' }}>
                        Remove
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* Dialog Edit Profile (placeholder) */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile (placeholder)</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>This is a placeholder for the employer profile editing form.</Typography>
            <TextField fullWidth label="Name" sx={{ mb: 2 }} />
            <TextField fullWidth label="Role" sx={{ mb: 2 }} />
            <TextField fullWidth label="Company" sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" sx={{ mb: 2 }} />
            <TextField fullWidth label="ABN" sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button variant="contained" disabled>Save</Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for creating new job */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new job</DialogTitle>
          <DialogContent>
            <TextField label="Title" fullWidth margin="normal" value={newJob.titulo} onChange={e => setNewJob({ ...newJob, titulo: e.target.value })} />
            <TextField label="Salary" fullWidth margin="normal" value={newJob.salario} onChange={e => setNewJob({ ...newJob, salario: e.target.value })} />
            <TextField label="Closing Date" type="date" fullWidth margin="normal"
              InputLabelProps={{ shrink: true }} value={newJob.closeDate} onChange={e => setNewJob({ ...newJob, closeDate: e.target.value })} />
            <TextField label="Description" fullWidth multiline rows={3} margin="normal" value={newJob.descricao} onChange={e => setNewJob({ ...newJob, descricao: e.target.value })} />
            <TextField label="Image URL" fullWidth margin="normal" value={newJob.imagem} onChange={e => setNewJob({ ...newJob, imagem: e.target.value })} />
            <TextField label="Contact" fullWidth margin="normal" value={newJob.contato} onChange={e => setNewJob({ ...newJob, contato: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate} variant="contained">Create</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
