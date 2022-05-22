import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";

import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material";
import { SearchProps } from "./types";

export default function Search({ value, onChange }: SearchProps) {
  const theme = useTheme();
  const styles = {
    width: "45vw",
    background: "rgba(0, 0, 0, 0.09)",
    color: theme.palette.secondary.main,
    fontSize: 18,
  };

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton aria-label="delete">
        <SearchIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <OutlinedInput
        id="outlined-adornment-weight"
        value={value}
        onChange={onChange}
        endAdornment={endAdornment}
        aria-describedby="outlined-weight-helper-text"
        placeholder="Search"
        sx={styles}
      />
    </Box>
  );
}
