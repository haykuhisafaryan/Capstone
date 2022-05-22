import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import React from "react";

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface MenuProps {
  content: React.ReactNode | React.ReactElement;
}
