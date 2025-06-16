import React from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../mock/jobs";
import { Container, Typography, Card, Box, Avatar, Button } from "@mui/material";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));
  if (!job) return <Container><Typography>Vaga não encontrada.</Typography></Container>;

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 6
    }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 5, boxShadow: "0 8px 40px #0001" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar src={job.imagem} sx={{ width: 76, height: 76, mr: 3, border: "3px solid #17c3b2" }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{job.titulo}</Typography>
              <Typography variant="body1" sx={{ color: "#6610f2", fontWeight: 500 }}>{job.empresa}</Typography>
              <Typography variant="body2" sx={{ color: "#17c3b2", fontWeight: 600 }}>{job.salario}</Typography>
            </Box>
          </Box>
          <Typography sx={{ my: 2 }}>{job.descricao}</Typography>
          <Typography sx={{ mb: 2 }} color="text.secondary">
            Fecha em: {new Date(job.closeDate).toLocaleString()}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Para candidatar-se: <a href={`mailto:${job.contato}`}>{job.contato}</a>
          </Typography>
          <Button component={Link} to="/" variant="outlined" color="primary">
            Voltar
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
