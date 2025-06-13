import React from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../mock/jobs";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));

  if (!job) return <Container><Typography>Vaga não encontrada.</Typography></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{job.titulo}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{job.empresa}</Typography>
          <Typography variant="body2" color="primary">{job.salario}</Typography>
          <Typography sx={{ mt: 2 }}>{job.descricao}</Typography>
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Fecha em: {new Date(job.closeDate).toLocaleString()}
          </Typography>
          <Typography sx={{ mt: 2 }}>Para candidatar-se: <a href={`mailto:${job.contato}`}>{job.contato}</a></Typography>
          <Button component={Link} to="/" sx={{ mt: 3 }} variant="outlined">Voltar</Button>
        </CardContent>
      </Card>
    </Container>
  );
}
