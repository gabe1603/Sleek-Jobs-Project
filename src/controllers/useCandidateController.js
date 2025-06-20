import { useState } from "react";
import candidateService from "../services/candidateService";

export function useCandidateController() {
  const [user] = useState(candidateService.getUser());
  const [cv] = useState(candidateService.getCV());
  const [vagasCandidatadas] = useState(candidateService.getAppliedJobs());
  const [openEditCV, setOpenEditCV] = useState(false);

  return {
    user,
    cv,
    vagasCandidatadas,
    openEditCV,
    setOpenEditCV
  };
} 