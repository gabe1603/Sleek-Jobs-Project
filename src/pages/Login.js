import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Card, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../controllers/useAuth";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWelcome("");
    try {
      const result = await login(form.email, form.senha);
      console.log(result)
      if (result.success) {
        setWelcome(`Bem-vindo(a), ${result.user.nome}!`);
        if (result.user.tipo === "empregador") {
          navigate("/");
        } else if (result.user.tipo === "candidato") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado ao tentar fazer login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)", py: 8 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0 8px 32px #0001" }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              fullWidth
              margin="normal"
              value={form.senha}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 700 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {welcome && <Alert severity="success" sx={{ mt: 2 }}>{welcome}</Alert>}
          <Typography sx={{ mt: 3, textAlign: 'center', fontSize: 15 }}>
            Não tem uma conta?{" "}
            <Link to="/cadastro" style={{ color: '#6610f2', fontWeight: 700, textDecoration: 'none' }}>
              Cadastre-se
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
