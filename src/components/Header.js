import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 2px 16px #6610f217",
        borderBottom: "1.5px solid #f2f2f2"
      }}
    >
      <Toolbar sx={{ minHeight: 76 }}>
        {/* Logo à esquerda */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="/logo.png"
            alt="Sleek Logo"
            sx={{
              width: 44,
              height: 44,
              mr: 2,
              border: "2px solid #6610f2"
            }}
          />
          <Typography
            variant="h6"
            sx={{ color: "#6610f2", fontWeight: 700, letterSpacing: 2, ml: 1 }}
          >
            Sleek Jobs Board
          </Typography>
        </Box>

        {/* Botões centralizados */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 600, fontSize: 18 }}>
            VAGAS
          </Button>
          <Button color="primary" component={Link} to="/stats" sx={{ fontWeight: 600, fontSize: 18 }}>
            ESTATÍSTICAS
          </Button>
          <Button color="primary" component={Link} to="/about" sx={{ fontWeight: 600, fontSize: 18 }}>
            SOBRE
          </Button>
        </Box>

        {/* Área do Empregador à direita */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{
              borderRadius: 8,
              fontWeight: 700,
              px: 2.5,
              fontSize: 16,
              background: "linear-gradient(90deg,#6610f2,#17c3b2)"
            }}
          >
            ÁREA DO EMPREGADOR
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
