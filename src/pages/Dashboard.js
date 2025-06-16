import React, { useState } from "react";
import { Container, Typography, Box, Card, Button, Avatar, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { jobs as mockJobs } from "../mock/jobs";

export default function Dashboard() {
  // Simula que o empregador logado é sempre "Sleek Training"
  const employer = "Sleek Training";
  const [jobs, setJobs] = useState(mockJobs.filter(j => j.empresa === employer));
  const [open, setOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    titulo: "",
    salario: "",
    closeDate: "",
    descricao: "",
    imagem: "",
    contato: ""
  });

  // CRUD Simples (mock)
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
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#222", mb: 3 }}>
          Minhas Vagas
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 4 }}>
          Criar nova vaga
        </Button>
        {jobs.length === 0 ? (
          <Typography color="text.secondary">Você ainda não publicou nenhuma vaga.</Typography>
        ) : (
          jobs.map(job => (
            <Card key={job.id} sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              px: 3,
              py: 2,
              borderRadius: 4,
              background: "#fff",
              boxShadow: "0 4px 18px #0001"
            }}>
              <Avatar src={job.imagem} sx={{ width: 70, height: 70, mr: 3, border: "2px solid #17c3b2" }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{job.titulo}</Typography>
                <Typography variant="body2" sx={{ color: "#6610f2", fontWeight: 500 }}>{job.salario}</Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>Fecha em: {new Date(job.closeDate).toLocaleDateString()}</Typography>
              </Box>
              <Button onClick={() => handleRemove(job.id)} color="error" variant="outlined" sx={{ ml: 2 }}>
                Remover
              </Button>
            </Card>
          ))
        )}

        {/* Dialog para criar nova vaga */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Criar nova vaga</DialogTitle>
          <DialogContent>
            <TextField label="Título" fullWidth margin="normal" value={newJob.titulo} onChange={e => setNewJob({ ...newJob, titulo: e.target.value })} />
            <TextField label="Salário" fullWidth margin="normal" value={newJob.salario} onChange={e => setNewJob({ ...newJob, salario: e.target.value })} />
            <TextField label="Data de Fechamento" type="date" fullWidth margin="normal"
              InputLabelProps={{ shrink: true }} value={newJob.closeDate} onChange={e => setNewJob({ ...newJob, closeDate: e.target.value })} />
            <TextField label="Descrição" fullWidth multiline rows={3} margin="normal" value={newJob.descricao} onChange={e => setNewJob({ ...newJob, descricao: e.target.value })} />
            <TextField label="URL da Imagem" fullWidth margin="normal" value={newJob.imagem} onChange={e => setNewJob({ ...newJob, imagem: e.target.value })} />
            <TextField label="Contato" fullWidth margin="normal" value={newJob.contato} onChange={e => setNewJob({ ...newJob, contato: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleCreate} variant="contained">Criar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
