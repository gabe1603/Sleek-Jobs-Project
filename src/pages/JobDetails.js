import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../mock/jobs";
import { Container, Typography, Card, Box, Avatar, Button } from "@mui/material";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));
  const [scrollOnlyCard, setScrollOnlyCard] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  if (!job) return <Container><Typography>Vaga não encontrada.</Typography></Container>;

  // Função para ativar scroll só no card
  const handleCardClick = (e) => {
    e.stopPropagation();
    setScrollOnlyCard(true);
    // Foca no card para acessibilidade
    if (cardRef.current) cardRef.current.focus();
    // Impede scroll do body
    document.body.style.overflow = "hidden";
  };
  // Função para liberar scroll global
  const handleBgClick = () => {
    setScrollOnlyCard(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
        py: 6
      }}
      onClick={handleBgClick}
      tabIndex={-1}
      style={{ outline: "none" }}
    >
      <Container maxWidth="sm">
        <Card
          ref={cardRef}
          tabIndex={0}
          onClick={handleCardClick}
          sx={{
            p: 4,
            borderRadius: 5,
            boxShadow: "0 8px 40px #0001",
            maxHeight: "80vh",
            overflowY: "auto",
            cursor: scrollOnlyCard ? "grab" : "pointer",
            outline: scrollOnlyCard ? "2px solid #6610f2" : "none",
            transition: "box-shadow 0.2s, outline 0.2s"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar src={job.imagem} sx={{ width: 76, height: 76, mr: 3, border: "3px solid #17c3b2" }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{job.titulo}</Typography>
              <Typography variant="body1" sx={{ color: "#6610f2", fontWeight: 500 }}>{job.empresa}</Typography>
              <Typography variant="body2" sx={{ color: "#17c3b2", fontWeight: 600 }}>{job.salario}</Typography>
            </Box>
          </Box>
          <Typography sx={{ mb: 2 }}>{job.resumo}</Typography>
          <Typography sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#6610f2" }}>Responsabilidades:</Typography>
          <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
            {job.responsabilidades.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
          <Typography sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#6610f2" }}>Requisitos:</Typography>
          <ul style={{ paddingLeft: 20 }}>
            {job.requisitos.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
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
