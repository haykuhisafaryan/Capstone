import React from "react";
import { Typography } from "@mui/material";

export default function Title({ children }: { children: string }) {
  return (
    <Typography variant="h4" color="secondary" align="left">
      {children}
    </Typography>
  );
}
