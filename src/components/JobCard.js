import React from "react";
import { Card, Box, Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 4,
        px: 4,
        py: 3,
        borderRadius: 5,
        background: "#fff",
        boxShadow: "0 8px 32px #0001",
        transition: "0.2s",
        "&:hover": { boxShadow: "0 12px 48px #0002", transform: "scale(1.01)" }
      }}
    >
      <Avatar
        src={job.image || job.imagem}
        alt={job.empresa}
        sx={{
          width: 90,
          height: 90,
          mr: 4,
          border: "4px solid #17c3b2"
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#222" }}>
          {job.titulo}
        </Typography>
        <Typography variant="body1" sx={{ color: "#6610f2", fontWeight: 500 }}>
          {job.empresa}
        </Typography>
        <Typography variant="body2" sx={{ color: "#17c3b2", fontWeight: 600 }}>
          {job.salario}
        </Typography>
        <Typography variant="body2" sx={{ color: "#888" }}>
          {job.local}
        </Typography>
        <Typography variant="body2" sx={{ color: "#888" }}>
          Fecha em: <b style={{ color: "#ff5252" }}>{new Date(job.closeDate).toLocaleDateString()}</b>
        </Typography>
      </Box>
      <Button
        component={Link}
        to={`/jobs/${job.id}`}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          borderRadius: 8,
          fontWeight: 600,
          px: 2.5,
          py: 1.2,
          fontSize: 18,
          ml: 3,
          background: "linear-gradient(90deg,#6610f2,#17c3b2)",
          boxShadow: "0px 3px 12px #17c3b241"
        }}
      >
        Ver detalhes
      </Button>
    </Card>
  );
}
