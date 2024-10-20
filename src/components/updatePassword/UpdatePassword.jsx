import React, { useState } from "react";
import { Container, Button, styled, Box } from "@mui/material";
import image from "../../assets/png/wallpaperflare.com_wallpaper.jpg";
import { StyledTextField } from "../../utils/elements";
import { updatePassword } from "../../api";
import { useNavigate } from "react-router-dom";

const StyledLoginPage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#000",
  flexDirection: "column",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "white",
  backgroundColor: "#F98E0A",
  "&:hover": {
    background: "none",
    border: "1px solid #F98E0A",
  },
}));

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
    email: "",
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (event) => {
    updatePassword(passwords)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  };

  return (
    <StyledLoginPage>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${image})`, // Set the background image
          backgroundSize: "contain", // Adjust the background size
          backgroundRepeat: "no-repeat", // Prevent repetition
          height: "400px",
          width: "400px",
          marginBottom: "1rem",
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
      ></Box>
      <Container
        sx={{
          alignItems: "center",
          textAlign: "center",
          maxWidth: { xl: "md", lg: "md", sm: "sm", xs: "sm" },
        }}
      >
        <form onSubmit={handleUpdatePassword}>
          <StyledTextField
            sx={{ mb: 2 }}
            label="email"
            variant="outlined"
            fullWidth
            required
            name="email"
            value={passwords.email}
            onChange={handlePasswordChange}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            label="Current Password"
            variant="outlined"
            fullWidth
            required
            name="currentPass"
            value={passwords.currentPass}
            onChange={handlePasswordChange}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            name="newPass"
            value={passwords.newPass}
            onChange={handlePasswordChange}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            name="confirmPass"
            value={passwords.confirmPass}
            onChange={handlePasswordChange}
          />
          <StyledButton variant="contained" fullWidth type="submit">
            Update Password
          </StyledButton>
        </form>
      </Container>
    </StyledLoginPage>
  );
};
