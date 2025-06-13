import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, textAlign: "center", mt: 4 }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Sleek Training. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
