import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Card } from "@mui/material";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock: login válido se email termina com @sleek.com
    if (email.endsWith("@sleek.com") && senha.length >= 4) {
      setIsAuth(true);
      navigate("/dashboard");
    } else {
      setError("E-mail ou senha inválidos (dica: use um email @sleek.com e qualquer senha).");
    }
  };

  return (
    <Box sx={{
      minHeight: "60vh",
      background: "linear-gradient(135deg, #f7f8fc 70%, #e0c3fc 100%)",
      py: 8
    }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0 8px 32px #0001" }}>
          <Typography variant="h4" gutterBottom>Login do Empregador</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Entrar
            </Button>
          </form>
        </Card>
      </Container>
    </Box>
  );
}
