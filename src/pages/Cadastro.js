import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "",
    empresa: "",
    cargo: ""
  });
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Field validation
  const validate = () => {
    let temp = {};
    temp.nome = form.nome ? "" : "Name is required.";
    temp.email = /^\S+@\S+\.\S+$/.test(form.email) ? "" : "Invalid email address.";
    temp.senha = form.senha.length >= 6 ? "" : "Password must be at least 6 characters long.";
    temp.tipo = form.tipo ? "" : "Please select an option.";
    if (form.tipo === "empresa") {
      temp.empresa = form.empresa ? "" : "Company name is required.";
      temp.cargo = form.cargo ? "" : "Job title at company is required.";
    }
    setErrors(temp);
    return Object.values(temp).every(x => x === "");
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      if (form.tipo === "candidato") {
        setShowDialog(true);
      } else {
        // Redirect to employer dashboard
        navigate("/dashboard");
      }
    }
  };

  const handleDialog = (resposta) => {
    setShowDialog(false);
    if (resposta === "sim") {
      navigate("/curriculo");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0 8px 32px #0001" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#222" }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              name="nome"
              fullWidth
              margin="normal"
              value={form.nome}
              onChange={handleChange}
              error={!!errors.nome}
              helperText={errors.nome}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              value={form.senha}
              onChange={handleChange}
              error={!!errors.senha}
              helperText={errors.senha || "Minimum 6 characters"}
              required
            />
            <FormControl
              component="fieldset"
              margin="normal"
              error={!!errors.tipo}
              required
              sx={{ width: "100%", mt: 2 }}
            >
              <FormLabel component="legend" sx={{ fontWeight: 700, color: "#6610f2" }}>
                You are:
              </FormLabel>
              <RadioGroup
                row
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="candidato"
                  control={<Radio color="primary" />}
                  label="Looking for jobs"
                />
                <FormControlLabel
                  value="empresa"
                  control={<Radio color="primary" />}
                  label="Offering jobs"
                />
              </RadioGroup>
              <FormHelperText>{errors.tipo}</FormHelperText>
            </FormControl>
            {form.tipo === "empresa" && (
              <>
                <TextField
                  label="Company Name"
                  name="empresa"
                  fullWidth
                  margin="normal"
                  value={form.empresa}
                  onChange={handleChange}
                  error={!!errors.empresa}
                  helperText={errors.empresa}
                  required
                />
                <TextField
                  label="Job Title at Company"
                  name="cargo"
                  fullWidth
                  margin="normal"
                  value={form.cargo}
                  onChange={handleChange}
                  error={!!errors.cargo}
                  helperText={errors.cargo}
                  required
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 700 }}
            >
              Register
            </Button>
          </form>
          <Typography sx={{ mt: 3, textAlign: "center", fontSize: 15 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6610f2", fontWeight: 700, textDecoration: "none" }}>
              Log in
            </Link>
          </Typography>
        </Card>
      </Container>
      {/* Dialog for creating resume */}
      <Dialog open={showDialog} onClose={() => handleDialog("nao")}>
        <DialogTitle sx={{ fontWeight: 700, color: "#6610f2" }}>Registration successful!</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Do you want to create your resume now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialog("nao")} color="inherit">
            No
          </Button>
          <Button onClick={() => handleDialog("sim")} variant="contained" color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 