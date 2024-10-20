import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {  Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/png/maknisa-removebg-preview.png";
import { Logo } from "../../assets";

export const Header = ({ setShow }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePassword = () => {
    setShow(true);
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("@token");
    localStorage.removeItem("@email");
    localStorage.removeItem("@invoiceId");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1,  background: "black", margin: "0", padding:"0",position: "sticky", width:"100%" }}>
      <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, color: "#F98E0A" }}>
            <img
              src={Logo}
              alt="logo"
              style={{
                maxWidth: "40px",
                filter: "drop-shadow(2px 4px 6px black)",
              }}
            />
            <img src={logo} alt="logo" style={{ maxWidth: "200px" }} />
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{color: "white"}}
          >
            <Settings />
          </IconButton>
          <Menu
            sx={{ position: "absolute", top: "30px", right: "0" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleChangePassword} sx={{ color: "#F98E0A" }}>
              Update Password
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "#F98E0A" }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
