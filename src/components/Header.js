import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <img src="/logo.png" alt="Sleek Logo" style={{ height: 40, marginRight: 16 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sleek Jobs Board
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Vagas</Button>
          <Button color="inherit" component={Link} to="/stats">Estatísticas</Button>
          <Button color="inherit" component={Link} to="/about">Sobre</Button>
          <Button color="inherit" component={Link} to="/login">Área do Empregador</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
