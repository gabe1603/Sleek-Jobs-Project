import React from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Chip,
  Avatar,
  Stack,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useCandidateProfileController } from "../controllers/useCandidateProfileController";

export default function DashboardCandidato() {
  const { applications, cv, skills, user, loading } = useCandidateProfileController();

  if (loading) return <Box sx={{ p: 4 }}>Carregando...</Box>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Coluna esquerda: Perfil + Vagas */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Card de Perfil */}
              <Card
                sx={{
                  p: 4,
                  borderRadius: 5,
                  boxShadow: "0 4px 24px #0001",
                  bgcolor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${process.env.REACT_APP_IMAGE_URL}${user?.avatar}`} 
                  crossOrigin="anonymous"
                  alt={user?.name}
                  sx={{
                    width: 90,
                    height: 90,
                    mb: 2,
                    border: "3px solid #6610f2",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {user?.name}
                </Typography>
                <Typography sx={{ color: "#444", fontSize: 15, mb: 2 }}>
                  {user?.email}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mb: 2,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {Array.isArray(skills) &&
                    skills.map((skill) => (
                      <Chip
                        key={skill.id || skill.name}
                        label={skill.name}
                        color="primary"
                      />
                    ))}
                </Stack>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "#6610f2",
                    color: "#6610f2",
                    "&:hover": {
                      borderColor: "#6610f2",
                      bgcolor: "#f3e8ff",
                    },
                    width: "100%",
                  }}
                >
                  Edit Profile
                </Button>
              </Card>

              {/* Card de Vagas Inscritas */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 4px 18px #0001",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Vagas Inscritas
                </Typography>
                {applications.length === 0 ? (
                  <Typography color="text.secondary">
                    Nenhuma candidatura encontrada.
                  </Typography>
                ) : (
                  applications.map((app) => (
                    <Box
                      key={app.id}
                      sx={{ mb: 2, p: 1, borderBottom: "1px solid #eee" }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        {app.job?.title}
                      </Typography>
                      <Typography sx={{ color: "#888", fontSize: 14 }}>
                        {app.job?.company?.name}
                      </Typography>
                      <Chip
                        label={app.status}
                        color={app.status === "PENDING" ? "warning" : "success"}
                      />
                    </Box>
                  ))
                )}
              </Card>
            </Stack>
          </Grid>

          {/* Coluna direita: Currículo */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 18px #0001",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Currículo
              </Typography>
              {cv ? (
                <Box>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Resumo Profissional:
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: "pre-line",
                      mb: 2,
                      fontSize: 14,
                      color: "#444",
                    }}
                  >
                    {cv.summary}
                  </Typography>
                </Box>
              ) : (
                <Typography color="text.secondary">
                  Nenhum currículo encontrado.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
}
