import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function BodyLoader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress style={{ color: "#06599E" }} />
    </Box>
  );
}
