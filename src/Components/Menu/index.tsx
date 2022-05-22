import "./menu.css";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useTheme } from "@mui/material/styles";

import Logo from "../common/Logo";
import { setRefreshToken, setToken } from "../../utils";
import { AppBar, Drawer, DrawerHeader } from "./helpers";
import { MenuProps } from "./types";

export default function Menu({ content }: MenuProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const listItemStyles = {
    opacity: open ? 1 : 0,
    color: theme.palette.text.primary,
  };

  const listButtonStyles = {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
  };

  const listIconStyle = {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
  };

  const drawerStyles = {
    marginRight: 1,
    ...(open && { display: "none" }),
  };

  const boxStyles = {
    flexGrow: 1,
    p: 3,
    background: "#f4f4f4",
  };
  const menuTitleStyles = {
    fontWeight: "bold",
    color: theme.palette.primary.main,
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setToken(null);
    setRefreshToken(null);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={drawerStyles}
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <Logo />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={menuTitleStyles}>
            Bookify
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List>
            <Link to="/books" className="menu-link">
              <ListItemButton sx={listButtonStyles}>
                <ListItemIcon sx={listIconStyle}>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Books" sx={listItemStyles} />
              </ListItemButton>
            </Link>
            <Link to="/users" className="menu-link">
              <ListItemButton sx={listButtonStyles}>
                <ListItemIcon sx={listIconStyle}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" sx={listItemStyles} />
              </ListItemButton>
            </Link>
          </List>
          <div>
            <Divider />
            <List>
              <ListItemButton onClick={handleLogout} sx={listButtonStyles}>
                <ListItemIcon sx={listIconStyle}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" sx={listItemStyles} />
              </ListItemButton>
            </List>
          </div>
        </div>
      </Drawer>
      <Box component="main" sx={boxStyles}>
        <DrawerHeader />
        {content}
      </Box>
    </Box>
  );
}
