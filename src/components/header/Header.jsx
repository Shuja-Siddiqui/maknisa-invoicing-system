import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#F98E0A" }}
          >
            MAKNISA
          </Typography>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
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
