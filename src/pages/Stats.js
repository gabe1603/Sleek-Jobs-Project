import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { jobs } from "../mock/jobs";

export default function Stats() {
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => new Date(j.closeDate) > new Date()).length;
  const closedJobs = totalJobs - openJobs;

  return (
    <Box sx={{
      minHeight: "60vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 8
    }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#222" }}>
          Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="primary" variant="h5">{openJobs}</Typography>
                <Typography>Open Jobs</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="primary" variant="h5">{closedJobs}</Typography>
                <Typography>Closed Jobs</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="primary" variant="h5">{totalJobs}</Typography>
                <Typography>Total Jobs</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
