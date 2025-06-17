import React, { useState, useEffect } from "react";
import { useJobs } from "../controllers/useJobs";
import {
  Container, Card, CardContent, Typography, Avatar, Box, Button, TextField, InputAdornment, Chip, CircularProgress, Alert, Select, MenuItem, Slider, IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export default function Home() {
  const { jobs, loading, error, fetchJobs } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filterModelo, setFilterModelo] = useState("");
  const [filterSalario, setFilterSalario] = useState([0, 250000]);
  const [filterArea, setFilterArea] = useState("");
  const [filterContrato, setFilterContrato] = useState("");
  const [filterJornada, setFilterJornada] = useState("");
  const [filterSenioridade, setFilterSenioridade] = useState("");

  const handleSearch = () => {
    console.log("handleSearch foi chamada!");
    const filters = {
      searchTitle: searchTitle,
      searchLocation: searchLocation,
      modelo: filterModelo === "" ? undefined : filterModelo,
      salario: filterSalario,
      area: filterArea === "" ? undefined : filterArea,
      contrato: filterContrato === "" ? undefined : filterContrato,
      jornada: filterJornada === "" ? undefined : filterJornada,
      senioridade: filterSenioridade === "" ? undefined : filterSenioridade,
    };
    console.log('Home: Filtros sendo enviados para o serviço', filters);
    fetchJobs(filters);
  };

  const handleClearFilters = () => {
    setSearchTitle("");
    setSearchLocation("");
    setFilterModelo("");
    setFilterSalario([0, 250000]);
    setFilterArea("");
    setFilterContrato("");
    setFilterJornada("");
    setFilterSenioridade("");
    fetchJobs(); // Recarrega todas as vagas sem filtros
  };

  useEffect(() => {
    fetchJobs(); // Carrega todas as vagas na montagem inicial
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      if (!selectedJob || !jobs.find(j => j.id === selectedJob.id)) {
        setSelectedJob(jobs[0]);
      }
    } else if (jobs.length === 0) {
      setSelectedJob(null);
    }
  }, [jobs, selectedJob]);

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
              {loading ? "Loading..." : error ? "Error loading jobs" : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`}
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
                onChange={e => {
                  setSearchTitle(e.target.value);
                  handleSearch();
                }}
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
                onChange={e => {
                  setSearchLocation(e.target.value);
                  handleSearch();
                }}
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
                onClick={handleSearch}
              >
                Find Job
              </Button>
            </Box>

            {/* Advanced Filters */}
            <Box sx={{ mb: 4, background: "#fff", boxShadow: "0 2px 12px #0001", borderRadius: 2, p: 2, position: "relative" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Advanced Filters</Typography>
              <IconButton
                onClick={handleClearFilters}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#96a0b5",
                }}
                aria-label="Clear Filters"
              >
                <CleaningServicesIcon />
              </IconButton>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <Select
                  value={filterModelo}
                  onChange={e => {
                    setFilterModelo(e.target.value);
                    handleSearch();
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'All Work Models' }}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  <MenuItem value="">All Work Models</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>

                <Select
                  value={filterArea}
                  onChange={e => {
                    setFilterArea(e.target.value);
                    handleSearch();
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'All Areas' }}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  <MenuItem value="">All Areas</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Analytics">Analytics</MenuItem>
                  <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                  <MenuItem value="QA">QA</MenuItem>
                  <MenuItem value="Mobile">Mobile</MenuItem>
                  <MenuItem value="Management">Management</MenuItem>
                  <MenuItem value="Support">Support</MenuItem>
                  <MenuItem value="Data">Data</MenuItem>
                  <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                </Select>

                <Select
                  value={filterContrato}
                  onChange={e => {
                    setFilterContrato(e.target.value);
                    handleSearch();
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'All Contracts' }}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  <MenuItem value="">All Contracts</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>

                <Select
                  value={filterJornada}
                  onChange={e => {
                    setFilterJornada(e.target.value);
                    handleSearch();
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'All Work Schedules' }}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  <MenuItem value="">All Work Schedules</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </Select>

                <Select
                  value={filterSenioridade}
                  onChange={e => {
                    setFilterSenioridade(e.target.value);
                    handleSearch();
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'All Seniorities' }}
                  sx={{ flex: 1, minWidth: 150 }}
                >
                  <MenuItem value="">All Seniorities</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Mid-level">Mid-level</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Specialist">Specialist</MenuItem>
                </Select>

                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Typography gutterBottom sx={{ fontSize: 12, color: "#888", mb: 0.5 }}>Salary: AU${filterSalario[0].toLocaleString()} - AU${filterSalario[1].toLocaleString()}</Typography>
                  <Slider
                    value={filterSalario}
                    onChange={(e, newValue) => {
                      setFilterSalario(newValue);
                      handleSearch();
                    }}
                    valueLabelDisplay="off"
                    min={0}
                    max={250000}
                    step={1000}
                    sx={{ width: '95%', mx: 'auto' }}
                  />
                </Box>

              </Box>
              
            </Box>

            {/* Job list (cards, one below the other) */}
            <Box>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : jobs.length === 0 ? (
                <Typography color="text.secondary" sx={{ mt: 4, ml: 2 }}>
                  No jobs found.
                </Typography>
              ) : (
                jobs.map((job) => (
                  <Card
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                    }}
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
                        {job.skills && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, p: 0 }}>
                            {job.skills.map(skill => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                sx={{
                                  background: "#ede7f6",
                                  color: "#6610f2",
                                  fontWeight: 600,
                                  fontSize: 13,
                                  borderRadius: 1
                                }}
                                onClick={e => e.stopPropagation()}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Box>

          {/* Right column: details panel */}
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
                top: 140,
                maxHeight: "80vh",
                overflowY: "auto",
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
                {selectedJob.resumo || "Description not available."}
              </Typography>
              {selectedJob.responsabilidades && selectedJob.responsabilidades.length > 0 && (
                <>
                  <Typography sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#6610f2" }}>Responsibilities:</Typography>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    {selectedJob.responsabilidades.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {selectedJob.requisitos && selectedJob.requisitos.length > 0 && (
                <>
                  <Typography sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#6610f2" }}>Requirements:</Typography>
                  <ul style={{ paddingLeft: 20 }}>
                    {selectedJob.requisitos.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              <Typography sx={{ mb: 2, color: "#888" }}>
                Closes on: {new Date(selectedJob.closeDate).toLocaleString()}
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
                APPLY NOW
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
