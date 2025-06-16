import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        color: "#888",
        py: 2,
        textAlign: "center",
        borderTop: "1.5px solid #f2f2f2",
        mt: 6
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Sleek Training. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
