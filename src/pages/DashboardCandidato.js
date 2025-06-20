import React from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Chip,
  Avatar,
  Stack,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useCandidateProfileController } from "../controllers/useCandidateProfileController";
import { upsertCV } from '../services/cvService';

export default function DashboardCandidato() {
  const {
    applications,
    cv,
    skills,
    user,
    loading,
    editProfile,
    setEditProfile,
    editProfileLoading,
    editProfileError,
    editProfileSuccess,
    handleEditProfile,
    avatarLoading,
    avatarError,
    avatarSuccess,
    handleUploadAvatar,
  } = useCandidateProfileController();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditCV, setOpenEditCV] = React.useState(false);
  const [cvContent, setCVContent] = React.useState(cv?.summary || "");
  const [cvLoading, setCVLoading] = React.useState(false);
  const [cvError, setCVError] = React.useState('');
  const [cvSuccess, setCVSuccess] = React.useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => { setCVContent(cv?.summary || ""); }, [cv]);

  const handleSaveCV = async () => {
    setCVLoading(true);
    setCVError('');
    setCVSuccess('');
    try {
      await upsertCV({ userId: user.id || user.userId, content: cvContent });
      setCVSuccess('Resume updated successfully!');
      setTimeout(() => setOpenEditCV(false), 1200);
    } catch (err) {
      setCVError(typeof err === 'string' ? err : 'Error updating resume');
    } finally {
      setCVLoading(false);
    }
  };

  if (loading) return <Box sx={{ p: 4 }}>Loading...</Box>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* LADO ESQUERDO */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Stack spacing={3} sx={{ width: "100%", maxWidth: 400 }}>
              {/* Perfil */}
              <Card sx={{
                p: 4,
                borderRadius: 5,
                boxShadow: "0 4px 24px #0001",
                bgcolor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Avatar src={`${process.env.REACT_APP_IMAGE_URL}${user?.avatar}`} crossOrigin="anonymous" alt={user?.name} sx={{ width: 90, height: 90, mb: 2, border: "3px solid #6610f2" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{user?.name}</Typography>
                <Typography sx={{ color: "#444", fontSize: 15, mb: 2 }}>{user?.email}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", justifyContent: "center" }}>
                  {Array.isArray(skills) && skills.map((skill) => (
                    <Chip key={skill.id || skill.name} label={skill.name} color="primary" />
                  ))}
                </Stack>
                <Button variant="outlined" startIcon={<EditIcon />} sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "#6610f2",
                  color: "#6610f2",
                  "&:hover": { borderColor: "#6610f2", bgcolor: "#f3e8ff" },
                  width: "100%"
                }} onClick={() => setOpenEdit(true)}>
                  Edit Profile
                </Button>
              </Card>
              {/* Vagas */}
              <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 18px #0001" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Applied Jobs</Typography>
                {applications.length === 0 ? (
                  <Typography color="text.secondary">No applications found.</Typography>
                ) : (
                  applications.map((app) => (
                    <Box key={app.id} sx={{ mb: 2, p: 1, borderBottom: "1px solid #eee", display: 'flex', alignItems: 'center', gap: 2 }}>
                      {app.job?.image && (
                        <Avatar src={app.job.image.startsWith('http') ? app.job.image : `${process.env.REACT_APP_IMAGE_URL}${app.job.image}`} alt={app.job?.title} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #17c3b2' }} variant="rounded" />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>{app.job?.title}</Typography>
                        <Typography sx={{ color: "#888", fontSize: 14 }}>{app.job?.company?.name}</Typography>
                      </Box>
                      <Chip label={app.status} color={app.status === "PENDING" ? "warning" : "success"} />
                    </Box>
                  ))
                )}
              </Card>
            </Stack>
          </Grid>

          {/* LADO DIREITO */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start"
            }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 18px #0001",
                width: "100%",
                maxWidth: 700,
                position: "relative",
                alignSelf: isMobile ? "center" : "flex-start"
              }}
            >
              <IconButton
                aria-label="edit resume"
                onClick={() => setOpenEditCV(true)}
                sx={{ position: 'absolute', top: 12, right: 12 }}
              >
                <EditIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Resume
              </Typography>
              {cv ? (
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Professional Summary:
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: "pre-line",
                      mb: 2,
                      fontSize: 14,
                      color: "#444",
                      wordBreak: "break-word",
                      lineHeight: 1.6,
                      maxWidth: "100%"
                    }}
                  >
                    {cv.summary}
                  </Typography>
                </Box>
              ) : (
                <Typography color="text.secondary">
                  No resume found.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Modais */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
          <Avatar
            src={`${process.env.REACT_APP_IMAGE_URL}${user?.avatar}`}
            alt={editProfile.name}
            sx={{ width: 90, height: 90, mb: 2, border: '3px solid #6610f2' }}
          />
          <Button
            variant="outlined"
            sx={{ mb: 3 }}
            component="label"
            disabled={avatarLoading}
          >
            {avatarLoading ? 'Uploading...' : 'Change Avatar'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => {
                if (e.target.files && e.target.files[0]) handleUploadAvatar(e.target.files[0]);
              }}
            />
          </Button>
          {avatarError && <Alert severity="error" sx={{ mb: 1, maxWidth: 400 }}>{avatarError}</Alert>}
          {avatarSuccess && <Alert severity="success" sx={{ mb: 1, maxWidth: 400 }}>{avatarSuccess}</Alert>}
          <TextField
            fullWidth
            label="Name"
            sx={{ mb: 2, maxWidth: 400 }}
            value={editProfile.name}
            onChange={e => setEditProfile({ ...editProfile, name: e.target.value })}
            disabled={editProfileLoading}
          />
          <TextField
            fullWidth
            label="Email"
            sx={{ mb: 2, maxWidth: 400 }}
            value={editProfile.email}
            onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
            disabled={editProfileLoading}
          />
          {editProfileError && <Alert severity="error" sx={{ mt: 2, maxWidth: 400 }}>{editProfileError}</Alert>}
          {editProfileSuccess && <Alert severity="success" sx={{ mt: 2, maxWidth: 400 }}>{editProfileSuccess}</Alert>}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setOpenEdit(false)} disabled={editProfileLoading}>Cancel</Button>
          <Button onClick={handleEditProfile} variant="contained" disabled={editProfileLoading}>
            {editProfileLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edição do CV */}
      <Dialog open={openEditCV} onClose={() => setOpenEditCV(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Resume</DialogTitle>
        <DialogContent>
          <TextField
            label="Professional Summary"
            multiline
            minRows={4}
            fullWidth
            value={cvContent}
            onChange={e => setCVContent(e.target.value)}
            sx={{ mt: 2 }}
          />
          {cvError && <Alert severity="error" sx={{ m: 2 }}>{cvError}</Alert>}
          {cvSuccess && <Alert severity="success" sx={{ m: 2 }}>{cvSuccess}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditCV(false)} disabled={cvLoading}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCV} disabled={cvLoading}>
            {cvLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
