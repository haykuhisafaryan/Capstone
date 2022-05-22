import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F1D00A',
    },
    secondary: {
      main: '#21325E',
    },
    background: {
      default: '#08131f',
      paper: '#21325E',
    },
    info: {
      main: '#3E497A',
    },
  },
  shape: {
    borderRadius: 5,
  },
  spacing: 8,
  typography: {
    fontFamily: 'SFProText, Arial',
  },
});
