import React, { useState } from "react";
import { Container, Typography, Card, Box, Button, Chip, Avatar, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';

// Mock de dados do candidato
const userMock = {
  nome: localStorage.getItem("userName") || "Lucas Candidate",
  email: "candidate@email.com",
  about: "Passionate about technology, always learning and looking for new challenges. Experienced in React, Node.js and cloud solutions.",
  skills: ["React", "Node.js", "TypeScript", "AWS", "Agile", "UI/UX"],
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

// Mock de CV
const cvMock = {
  summary: "Motivated software developer with 5+ years of experience in web and cloud solutions. Strong problem-solving skills and a passion for continuous learning.",
  keySkills: ["React", "Node.js", "TypeScript", "AWS", "Agile", "UI/UX", "Teamwork", "Communication"],
  experience: [
    {
      role: "Fullstack Developer",
      organisation: "Sleek Training",
      start: "01/03/2021",
      end: "15/04/2024"
    },
    {
      role: "Front-end Developer",
      organisation: "WebWave",
      start: "10/01/2019",
      end: "28/02/2021"
    }
  ],
  education: [
    {
      degree: "Bachelor of Information Technology",
      institution: "University of Sydney",
      years: "2015 - 2018"
    }
  ],
  languages: ["English (fluent)", "Portuguese (native)", "Spanish (intermediate)"]
};

// Mock de vagas aplicadas
const vagasCandidatadas = [
  {
    id: 1,
    titulo: "Fullstack Developer",
    empresa: "Sleek Training",
    local: "Sydney, NSW",
    salario: "AU$ 90,000 - AU$ 110,000",
    status: "Under review",
    imagem: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    titulo: "Front-end Developer",
    empresa: "WebWave",
    local: "Melbourne, VIC",
    salario: "AU$ 75,000 - AU$ 100,000",
    status: "Interview",
    imagem: "https://randomuser.me/api/portraits/men/56.jpg"
  },
  {
    id: 3,
    titulo: "QA Tester",
    empresa: "QualityFirst",
    local: "Brisbane, QLD",
    salario: "AU$ 60,000 - AU$ 80,000",
    status: "Candidate",
    imagem: "https://randomuser.me/api/portraits/women/23.jpg"
  }
];

export default function DashboardCandidato() {
  const [openEditCV, setOpenEditCV] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 5, mb: 5, boxShadow: "0 4px 24px #0001", display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff' }}>
              <Avatar src={userMock.avatar} alt={userMock.nome} sx={{ width: 96, height: 96, mb: 2, border: '3px solid #6610f2' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{userMock.nome}</Typography>
              <Typography sx={{ color: "#6610f2", mb: 1 }}>{userMock.email}</Typography>
              <Button variant="outlined" startIcon={<EditIcon />} sx={{ mb: 2, borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: '#6610f2', color: '#6610f2', '&:hover': { borderColor: '#6610f2', bgcolor: '#f3e8ff' } }}>
                Edit Profile
              </Button>
              <Box sx={{ width: '100%', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>About me</Typography>
                <Typography sx={{ color: '#444', fontSize: 16 }}>{userMock.about}</Typography>
              </Box>
              <Box sx={{ width: '100%', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Skills</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {userMock.skills.map(skill => (
                    <Chip key={skill} label={skill} sx={{ bgcolor: '#ede7f6', color: '#6610f2', fontWeight: 600, fontSize: 15, borderRadius: 1 }} />
                  ))}
                </Stack>
              </Box>
            </Card>
            {/* CV CARD */}
            <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 5, mb: 5, boxShadow: "0 4px 24px #0001", bgcolor: '#fff' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222' }}>Your CV</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
                  <Button variant="outlined" startIcon={<EditIcon />} sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', borderColor: '#6610f2', color: '#6610f2', '&:hover': { borderColor: '#6610f2', bgcolor: '#f3e8ff' } }} onClick={() => setOpenEditCV(true)}>
                    Edit CV
                  </Button>
                  <Button variant="contained" startIcon={<DownloadIcon />} sx={{ borderRadius: 3, fontWeight: 600, textTransform: 'none', bgcolor: '#6610f2', '&:hover': { bgcolor: '#5b21b6' } }}>
                    Download PDF
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Profile Summary</Typography>
                <Typography sx={{ color: '#444', fontSize: 16 }}>{cvMock.summary}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Key Skills</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {cvMock.keySkills.map(skill => (
                    <Chip key={skill} label={skill} sx={{ bgcolor: '#e0e7ef', color: '#222', fontWeight: 600, fontSize: 15, borderRadius: 1 }} />
                  ))}
                </Stack>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Recent Experience</Typography>
                {cvMock.experience.map((exp, idx) => (
                  <Box key={idx} sx={{ mb: 1.5, pl: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#6610f2', fontSize: 16 }}>{exp.role}</Typography>
                    <Typography sx={{ color: '#444', fontSize: 15 }}>{exp.organisation}</Typography>
                    <Typography sx={{ color: '#888', fontSize: 14 }}>{exp.start} – {exp.end}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Education</Typography>
                {cvMock.education.map((edu, idx) => (
                  <Box key={idx} sx={{ mb: 1.5, pl: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#6610f2', fontSize: 16 }}>{edu.degree}</Typography>
                    <Typography sx={{ color: '#444', fontSize: 15 }}>{edu.institution}</Typography>
                    <Typography sx={{ color: '#888', fontSize: 14 }}>{edu.years}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>Languages</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {cvMock.languages.map(lang => (
                    <Chip key={lang} label={lang} sx={{ bgcolor: '#f3f4f6', color: '#222', fontWeight: 600, fontSize: 15, borderRadius: 1 }} />
                  ))}
                </Stack>
              </Box>
              <Typography sx={{ color: '#888', fontStyle: 'italic', fontSize: 15, mt: 1 }}>
                References available on request
              </Typography>
            </Card>
            {/* Modal Edit CV (placeholder) */}
            <Dialog open={openEditCV} onClose={() => setOpenEditCV(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Edit CV (placeholder)</DialogTitle>
              <DialogContent>
                <Typography sx={{ mb: 2 }}>This is a placeholder for the CV editing form.</Typography>
                <TextField fullWidth label="Profile Summary" sx={{ mb: 2 }} />
                {/* Adicione campos reais conforme necessário */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEditCV(false)}>Cancel</Button>
                <Button variant="contained" disabled>Save</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#222", mb: 2, mt: 4 }}>
          Jobs I Applied For
        </Typography>
        <Grid container spacing={3}>
          {vagasCandidatadas.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary">You have not applied for any jobs yet.</Typography>
            </Grid>
          ) : (
            vagasCandidatadas.map(vaga => (
              <Grid item xs={12} md={6} key={vaga.id}>
                <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 2px 12px #0001", display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff' }}>
                  <Avatar src={vaga.imagem} sx={{ width: 56, height: 56, mr: 2, border: "2px solid #17c3b2" }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{vaga.titulo}</Typography>
                    <Typography sx={{ color: "#6610f2", fontWeight: 500 }}>{vaga.empresa}</Typography>
                    <Typography sx={{ color: "#888" }}>{vaga.local}</Typography>
                    <Typography sx={{ color: "#17c3b2", fontWeight: 600 }}>{vaga.salario}</Typography>
                  </Box>
                  <Chip label={vaga.status} color={vaga.status === "Under review" ? "warning" : vaga.status === "Interview" ? "info" : "success"} sx={{ fontWeight: 700, fontSize: 15, minWidth: 110, textAlign: 'center' }} />
                  <Button variant="contained" sx={{ ml: 2, borderRadius: 3, textTransform: 'none', fontWeight: 600, bgcolor: '#6610f2', '&:hover': { bgcolor: '#5b21b6' } }}>
                    View
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
} 