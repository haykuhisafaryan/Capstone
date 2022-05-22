import "./loading.css";
import { Box } from "@mui/material";
import React from "react";

export default function Loading() {
  const boxStyles = {
    display: "flex",
    justifyContent: "center",
    height: "60vh",
    alignItems: "center",
  };

  return (
    <Box sx={boxStyles}>
      <div className="book">
        <div className="inner">
          <div className="left" />
          <div className="middle" />
          <div className="right" />
        </div>
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </Box>
  );
}
