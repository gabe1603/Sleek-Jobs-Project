import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>Sobre a Sleek Training</Typography>
        <Typography>
          Sleek Training oferece treinamento em ICT para centenas de alunos por ano, conectando talentos ao mercado de trabalho.
          <br />
          <br />
          Nosso objetivo é democratizar o acesso às oportunidades de emprego, facilitando o contato entre empresas e profissionais qualificados.
        </Typography>
      </Box>
    </Container>
  );
}
