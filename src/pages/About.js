import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function About() {
  return (
    <Box sx={{
      minHeight: "60vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 8
    }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#222" }}>
          Sobre a Sleek Training
        </Typography>
        <Typography sx={{ color: "#444", fontSize: 18, maxWidth: 700 }}>
          A Sleek Training conecta talentos em tecnologia com as melhores oportunidades do mercado.
          Democratizamos o acesso às vagas e facilitamos o contato entre empresas e profissionais de excelência.
        </Typography>
      </Container>
    </Box>
  );
}
