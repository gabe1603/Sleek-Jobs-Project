import React from "react";
import { Container, Typography } from "@mui/material";
import { jobs } from "../mock/jobs";
import JobCard from "../components/JobCard";

export default function Home() {
  // Ordena por closeDate
  const jobsList = [...jobs].sort((a, b) => new Date(a.closeDate) - new Date(b.closeDate));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vagas em Aberto
      </Typography>
      {jobsList.map(job => (
        <JobCard job={job} key={job.id} />
      ))}
    </Container>
  );
}
