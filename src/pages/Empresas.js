import React from "react";
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCompanies } from "../controllers/useCompanies";
import { useAuth } from "../controllers/useAuth";

export default function Empresas() {
  const { companies, loading, error } = useCompanies();
  const { userType, empresasIds } = useAuth();
  const isEmpregador = userType === "empregador";
  const minhasEmpresas = companies.filter(e => empresasIds.includes(e.id));

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
        <Container maxWidth="lg">
          <Typography>Carregando empresas...</Typography>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
        <Container maxWidth="lg">
          <Typography color="error">Erro ao carregar empresas: {error}</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#222", mb: 4 }}>
          Empresas que ofertam vagas
        </Typography>
        
        {isEmpregador && (
          <Card sx={{ p: 3, borderRadius: 4, mb: 4, boxShadow: "0 2px 12px #6610f222" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#6610f2", mb: 2 }}>
              Minhas Empresas
            </Typography>
            {minhasEmpresas.length === 0 ? (
              <Typography color="text.secondary">Você ainda não cadastrou nenhuma empresa.</Typography>
            ) : (
              <Grid container spacing={2}>
                {minhasEmpresas.map(emp => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={emp.id}>
                    <Card sx={{ p: 2, borderRadius: 3, boxShadow: "0 2px 8px #0001", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar src={emp.logo} alt={emp.nome} sx={{ width: 56, height: 56, mb: 1, border: "2px solid #17c3b2" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#6610f2", mb: 0.5, textAlign: 'center' }}>{emp.nome}</Typography>
                      <Chip label={emp.area} sx={{ background: "#ede7f6", color: "#6610f2", fontWeight: 600, fontSize: 13, mb: 0.5 }} />
                      <Typography sx={{ color: "#888", mb: 0.5 }}>{emp.local}</Typography>
                      <Chip label={`${emp.vagasAbertas} vaga${emp.vagasAbertas !== 1 ? 's' : ''} aberta${emp.vagasAbertas !== 1 ? 's' : ''}`} color="primary" sx={{ fontWeight: 700, fontSize: 13, mt: 1 }} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Card>
        )}
        
        {isEmpregador && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/cadastrar-empresa"
            sx={{ fontWeight: 700, borderRadius: 3, background: "linear-gradient(90deg,#6610f2,#17c3b2)", textTransform: 'none', mb: 4 }}
          >
            Cadastrar Empresa
          </Button>
        )}

        <Grid container spacing={4}>
          {companies.map(emp => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={emp.id}>
              <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001", display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 260 }}>
                <Avatar src={emp.logo} alt={emp.nome} sx={{ width: 70, height: 70, mb: 2, border: "2px solid #17c3b2" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#6610f2", mb: 1, textAlign: 'center' }}>{emp.nome}</Typography>
                <Chip label={emp.area} sx={{ background: "#ede7f6", color: "#6610f2", fontWeight: 600, fontSize: 14, mb: 1 }} />
                <Typography sx={{ color: "#888", mb: 1 }}>{emp.local}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label={`${emp.vagasAbertas} vaga${emp.vagasAbertas !== 1 ? 's' : ''} aberta${emp.vagasAbertas !== 1 ? 's' : ''}`} color="primary" sx={{ fontWeight: 700, fontSize: 15 }} />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 