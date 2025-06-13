import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { jobs } from "../mock/jobs";

export default function Stats() {
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => new Date(j.closeDate) > new Date()).length;
  const closedJobs = totalJobs - openJobs;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Estatísticas</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="primary" variant="h5">{openJobs}</Typography>
              <Typography>Vagas em aberto</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="primary" variant="h5">{closedJobs}</Typography>
              <Typography>Vagas fechadas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="primary" variant="h5">{totalJobs}</Typography>
              <Typography>Total de vagas</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
