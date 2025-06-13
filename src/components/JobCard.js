import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Card sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar src={job.imagem} sx={{ width: 80, height: 80, m: 2 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{job.titulo}</Typography>
        <Typography variant="body2" color="text.secondary">{job.empresa}</Typography>
        <Typography variant="body2" color="primary">{job.salario}</Typography>
        <Typography variant="body2" color="text.secondary">
          Fecha em: {new Date(job.closeDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/jobs/${job.id}`} variant="contained" color="primary">
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
