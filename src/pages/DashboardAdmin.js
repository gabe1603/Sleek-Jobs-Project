import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Card, Grid, CircularProgress } from "@mui/material";
import jobService from "../services/jobService";
import api from "../services/api";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Buscar todos os usuários
        const usersRes = await api.get("/users");
        setUsers(usersRes.data);
        // Buscar todas as vagas
        const jobsRes = await jobService.getJobs();
        setJobs(jobsRes);
      } catch (err) {
        setUsers([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 6 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#222" }}>
          Admin Dashboard
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>All Users</Typography>
                {users.length === 0 ? (
                  <Typography color="text.secondary">No users found.</Typography>
                ) : (
                  users.map(user => (
                    <Box key={user.id} sx={{ mb: 2, p: 1, borderBottom: "1px solid #eee" }}>
                      <Typography sx={{ fontWeight: 600 }}>{user.name || user.nome} <span style={{ color: '#888', fontWeight: 400 }}>({user.email})</span></Typography>
                      <Typography sx={{ color: '#6610f2', fontSize: 14 }}>{user.role || user.type || user.tipo}</Typography>
                    </Box>
                  ))
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>All Jobs</Typography>
                {jobs.length === 0 ? (
                  <Typography color="text.secondary">No jobs found.</Typography>
                ) : (
                  jobs.map(job => (
                    <Box key={job.id} sx={{ mb: 2, p: 1, borderBottom: "1px solid #eee" }}>
                      <Typography sx={{ fontWeight: 600 }}>{job.title}</Typography>
                      <Typography sx={{ color: '#888', fontSize: 14 }}>{job.companyName || job.company?.name}</Typography>
                      <Typography sx={{ color: '#10B981', fontSize: 14 }}>{job.status}</Typography>
                    </Box>
                  ))
                )}
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
} 