import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular login
    alert("Login simulado: " + email);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Box>
    </Container>
  );
}
