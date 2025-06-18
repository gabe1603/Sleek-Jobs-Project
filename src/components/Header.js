import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../controllers/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { isAuth, userType, logout } = useAuth();

  let dashboardRoute = "";
  if (isAuth) {
    if (userType === "empregador") dashboardRoute = "/dashboard-empregador";
    else if (userType === "candidato") dashboardRoute = "/dashboard-candidato";
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
            src="/logo512.png"
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
          {isAuth && dashboardRoute && (
            <Button
              color="primary"
              component={Link}
              to={dashboardRoute}
              sx={{
                fontWeight: 600,
                fontSize: 18,
                mr: 1
              }}
            >
              PROFILE
            </Button>
          )}
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 600, fontSize: 18 }}>
            JOBS
          </Button>
          <Button color="primary" component={Link} to="/stats" sx={{ fontWeight: 600, fontSize: 18 }}>
            STATISTICS
          </Button>
          <Button color="primary" component={Link} to="/about" sx={{ fontWeight: 600, fontSize: 18 }}>
            ABOUT US
          </Button>
        </Box>

        {/* Autenticação à direita */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2
        }}>
          {isAuth ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 8,
                px: 2.5,
                background: "linear-gradient(90deg,#6610f2,#17c3b2)",
                textTransform: 'none'
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                component={Link}
                to="/login"
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 8,
                  px: 2.5,
                  textTransform: 'none',
                  mr: { xs: 0, md: 1 }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/cadastro"
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 8,
                  px: 2.5,
                  background: "linear-gradient(90deg,#6610f2,#17c3b2)",
                  textTransform: 'none'
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
