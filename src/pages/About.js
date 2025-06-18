import React from "react";
import { Container, Typography, Box, Card, CardContent, Avatar, Grid, Button, Stack, Divider } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const logoUrl = "https://raw.githubusercontent.com/LucasSantosDev/sleek-jobs-assets/main/logo-sleek.png";
const highlightColor = '#7C3AED'; // Roxo
const accentColor = '#10B981'; // Verde

export default function About() {
  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 4
    }}>
      <Container maxWidth="md">
        <Card sx={{
          borderRadius: 5,
          boxShadow: '0 4px 32px 0 rgba(124,58,237,0.08)',
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start', xs: 'center' },
          maxWidth: 900,
          mx: 'auto',
          bgcolor: '#fff',
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, mr: { md: 4 }, mb: { xs: 2, md: 0 } }}>
            <Avatar src={logoUrl} alt="Logo Sleek" sx={{ width: 90, height: 90, mb: 2, bgcolor: highlightColor }} />
          </Box>
          <CardContent sx={{ flex: 1, p: 0 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: highlightColor, mb: 1 }}>
              About Sleek Training
            </Typography>
            <Typography sx={{ color: "#222", fontSize: 18, mb: 2 }}>
              We connect technology talent with the best opportunities in the market. We democratise access to jobs and make it easier for innovative organisations to find outstanding professionals.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="subtitle1" sx={{ color: accentColor, fontWeight: 700 }}>Mission</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>
                    To bring people and organisations together, promoting inclusion, diversity and growth in the tech sector.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="subtitle1" sx={{ color: accentColor, fontWeight: 700 }}>Vision</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>
                    To be a reference in connecting talent and opportunities, boosting careers and businesses.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="subtitle1" sx={{ color: accentColor, fontWeight: 700 }}>Values</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>
                    Ethics, innovation, respect for diversity and a focus on the success of people and organisations.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: highlightColor, fontWeight: 700 }}>+500</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>Open jobs</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: accentColor, fontWeight: 700 }}>30+</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>Active organisations</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#6366f1', fontWeight: 700 }}>98%</Typography>
                  <Typography sx={{ color: '#444', fontSize: 15 }}>User satisfaction</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#555', mb: 0.5 }}>
                “Thanks to Sleek Training, I landed my dream job at a tech start-up!”
              </Typography>
              <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600 }}>
                — Marina, Fullstack Developer
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Button variant="contained" color="primary" startIcon={<LinkedInIcon />} sx={{ bgcolor: highlightColor, textTransform: 'none', fontWeight: 600, borderRadius: 3 }} href="https://www.linkedin.com/company/sleek-training" target="_blank">
                LinkedIn
              </Button>
              <Button variant="outlined" color="success" startIcon={<EmailIcon />} sx={{ borderColor: accentColor, color: accentColor, textTransform: 'none', fontWeight: 600, borderRadius: 3 }} href="mailto:contact@sleektraining.com">
                Contact
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
