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

  // Validação dos campos
  const validate = () => {
    let temp = {};
    temp.nome = form.nome ? "" : "Nome é obrigatório";
    temp.email = /^\S+@\S+\.\S+$/.test(form.email) ? "" : "E-mail inválido";
    temp.senha = form.senha.length >= 6 ? "" : "Senha deve ter pelo menos 6 caracteres";
    temp.tipo = form.tipo ? "" : "Selecione uma opção";
    if (form.tipo === "empresa") {
      temp.empresa = form.empresa ? "" : "Nome da empresa é obrigatório";
      temp.cargo = form.cargo ? "" : "Cargo na empresa é obrigatório";
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
        // Redireciona para dashboard do empregador
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
            Cadastre-se
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Nome"
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
              label="E-mail"
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
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              value={form.senha}
              onChange={handleChange}
              error={!!errors.senha}
              helperText={errors.senha || "Mínimo 6 caracteres"}
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
                Você está:
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
                  label="Procurando vagas"
                />
                <FormControlLabel
                  value="empresa"
                  control={<Radio color="primary" />}
                  label="Ofertando vagas"
                />
              </RadioGroup>
              <FormHelperText>{errors.tipo}</FormHelperText>
            </FormControl>
            {form.tipo === "empresa" && (
              <>
                <TextField
                  label="Nome da empresa"
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
                  label="Cargo na empresa"
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
              Cadastrar
            </Button>
          </form>
          <Typography sx={{ mt: 3, textAlign: "center", fontSize: 15 }}>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ color: "#6610f2", fontWeight: 700, textDecoration: "none" }}>
              Faça login
            </Link>
          </Typography>
        </Card>
      </Container>
      {/* Dialog para criar currículo */}
      <Dialog open={showDialog} onClose={() => handleDialog("nao")}>
        <DialogTitle sx={{ fontWeight: 700, color: "#6610f2" }}>Cadastro realizado!</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Deseja criar seu currículo agora?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialog("nao")} color="inherit">
            Não
          </Button>
          <Button onClick={() => handleDialog("sim")} variant="contained" color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 