import React from "react";
import { Container, Typography, Card, Box, Button, Chip, Avatar } from "@mui/material";
import { empresas } from '../mock/empresas';

// Mock de vagas candidatas
const vagasCandidatadas = [
  {
    id: 1,
    titulo: "Fullstack Developer",
    empresa: "Sleek Training",
    local: "São Paulo, SP",
    salario: "R$ 9.000 - R$ 11.000",
    status: "Em análise"
  },
  {
    id: 2,
    titulo: "Front-end Developer",
    empresa: "WebWave",
    local: "Porto Alegre, RS",
    salario: "R$ 7.500 - R$ 10.000",
    status: "Candidato"
  }
];

export default function DashboardCandidato() {
  // Recupera dados do usuário do localStorage
  const nome = localStorage.getItem("userName") || "";
  const email = "candidato@procurando.com"; // mock, pode ser salvo no localStorage no cadastro real
  const tipo = "Candidato";

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#222", mb: 3 }}>
          Meu Perfil
        </Typography>
        <Card sx={{ p: 4, borderRadius: 4, mb: 5, boxShadow: "0 4px 18px #0001" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{nome}</Typography>
          <Typography sx={{ color: "#6610f2", mb: 0.5 }}>{email}</Typography>
          <Chip label={tipo} color="primary" sx={{ fontWeight: 700, background: "#ede7f6", color: "#6610f2", fontSize: 15, mt: 1 }} />
        </Card>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#222", mb: 2 }}>
          Vagas que me candidatei
        </Typography>
        {vagasCandidatadas.length === 0 ? (
          <Typography color="text.secondary">Você ainda não se candidatou a nenhuma vaga.</Typography>
        ) : (
          vagasCandidatadas.map(vaga => {
            const empresaLogo = empresas.find(e => e.nome === vaga.empresa)?.logo;
            return (
              <Card key={vaga.id} sx={{ mb: 3, p: 3, borderRadius: 3, boxShadow: "0 2px 12px #0001" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {empresaLogo && (
                      <Avatar src={empresaLogo} alt={vaga.empresa} sx={{ width: 44, height: 44, mr: 2, border: "2px solid #17c3b2" }} />
                    )}
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{vaga.titulo}</Typography>
                      <Typography sx={{ color: "#6610f2", fontWeight: 500 }}>{vaga.empresa}</Typography>
                      <Typography sx={{ color: "#888" }}>{vaga.local}</Typography>
                      <Typography sx={{ color: "#17c3b2", fontWeight: 600 }}>{vaga.salario}</Typography>
                    </Box>
                  </Box>
                  <Chip label={vaga.status} color={vaga.status === "Em análise" ? "warning" : "success"} sx={{ fontWeight: 700, fontSize: 15 }} />
                </Box>
              </Card>
            );
          })
        )}
      </Container>
    </Box>
  );
} 