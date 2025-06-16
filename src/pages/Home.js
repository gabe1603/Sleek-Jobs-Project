import React, { useState, useEffect } from "react";
import { jobs } from "../mock/jobs";
import {
  Container, Card, CardContent, Typography, Avatar, Box, Button, TextField, InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Home() {
  const [selectedJob, setSelectedJob] = useState(jobs[0] || null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredJobs = jobs
    .filter(job =>
      (job.titulo.toLowerCase().includes(searchTitle.toLowerCase()) ||
        job.descricao.toLowerCase().includes(searchTitle.toLowerCase()))
      &&
      (job.local?.toLowerCase().includes(searchLocation.toLowerCase()) ||
        (searchLocation.trim() === "" || (searchLocation.toLowerCase() === "remoto" && job.local?.toLowerCase().includes("remoto"))))
    );

  // Seleciona a primeira vaga ao abrir ou filtrar
  useEffect(() => {
    if (!selectedJob || !filteredJobs.find(j => j.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0] || null);
    }
  }, [filteredJobs]);

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 6
    }}>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            maxWidth: 1800,
            mx: "auto",
            px: 2,
            display: "flex",
            gap: 4,
            alignItems: "flex-start",
            justifyContent: "center"
          }}
        >
          {/* Coluna esquerda: filtros + lista de vagas */}
          <Box sx={{ flex: 1.5, maxWidth: 680 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#222" }}>
              Vagas em Aberto
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 4,
                width: "100%",
                background: "#fff",
                boxShadow: "0 2px 12px #0001",
                borderRadius: 2,
                p: 1
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Job title or keyword"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "#96a0b5", mr: 1 }} />
                  ),
                  sx: { borderRadius: 2, background: "#fff" },
                }}
                sx={{
                  flex: 1,
                  mr: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: "#fff",
                  },
                  "& fieldset": {
                    borderColor: "#e6eaf2",
                  }
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Location"
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon sx={{ color: "#96a0b5", mr: 1 }} />
                  ),
                  sx: { borderRadius: 2, background: "#fff" },
                }}
                sx={{
                  flex: 1,
                  mr: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: "#fff",
                  },
                  "& fieldset": {
                    borderColor: "#e6eaf2",
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  px: 4,
                  py: 1.7,
                  minHeight: 48,
                  boxShadow: "0 2px 12px #0001",
                  background: "#1941d7",
                  textTransform: "none",
                  fontSize: 16
                }}
              >
                Find Job
              </Button>
            </Box>
            {/* Lista de vagas (cards, um embaixo do outro) */}
            <Box>
              {filteredJobs.length === 0 ? (
                <Typography color="text.secondary" sx={{ mt: 4, ml: 2 }}>
                  Nenhuma vaga encontrada.
                </Typography>
              ) : (
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    sx={{
                      minHeight: 130,
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 3,
                      px: 2,
                      boxShadow: selectedJob?.id === job.id
                        ? "0 0 0 3px #6610f2"
                        : "0 2px 16px #0001",
                      border: selectedJob?.id === job.id
                        ? "2px solid #6610f2"
                        : "1px solid #f2f2f2",
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "0.18s"
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center", width: "100%", py: 2 }}>
                      <Avatar src={job.imagem} sx={{ mr: 3, width: 56, height: 56, border: "2px solid #17c3b2" }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {job.titulo}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#6610f2", fontWeight: 500 }}>
                          {job.empresa}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#888" }}>
                          {job.local}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#17c3b2", fontWeight: 600 }}>
                          {job.salario}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Box>

          {/* Coluna direita: painel de detalhes */}
          {selectedJob && (
            <Box
              sx={{
                flex: 1,
                minWidth: 420,
                maxWidth: 600,
                ml: { xs: 0, md: 2 },
                mt: 2,
                bgcolor: "#fff",
                boxShadow: "0 4px 40px #0001",
                borderRadius: 2,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                position: "sticky",
                top: 140, // distância do topo ao rolar (ajuste para header)
                height: "fit-content", // só cresce até o conteúdo
                zIndex: 3
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}>
                <Avatar src={selectedJob.imagem} sx={{ width: 60, height: 60, mr: 2, border: "2px solid #17c3b2" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {selectedJob.titulo}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6610f2", fontWeight: 500 }}>
                    {selectedJob.empresa}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {selectedJob.local}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#17c3b2", fontWeight: 600 }}>
                    {selectedJob.salario}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mt: 2, mb: 3, color: "#222", fontSize: 16 }}>
                {selectedJob.descricao}
              </Typography>
              <Typography sx={{ mb: 2, color: "#888" }}>
                Fecha em: {new Date(selectedJob.closeDate).toLocaleString()}
              </Typography>
              <Button
                href={`mailto:${selectedJob.contato}`}
                variant="contained"
                color="primary"
                sx={{
                  mt: 1,
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  background: "#6610f2",
                  borderRadius: 99,
                  fontSize: 16,
                  boxShadow: "0 2px 12px #6610f224"
                }}
              >
                CANDIDATAR-ME
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
