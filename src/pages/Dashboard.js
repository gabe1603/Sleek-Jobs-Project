import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>Dashboard do Empregador</Typography>
        <Typography>
          Aqui o empregador poderá ver, editar, remover e criar novas vagas. (Funcionalidade em construção)
        </Typography>
      </Box>
    </Container>
  );
}
