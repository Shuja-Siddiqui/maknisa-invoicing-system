import React from "react";
import { Container, Button, styled, Box, Typography } from "@mui/material";
import image from "../assets/png/maknisa-logo.png";
import { StyledTextField } from "../utils/elements";
import { useNavigate } from "react-router-dom";
import { forgetPass, login } from "../api/config";
import { useState } from "react";
import { Logo } from "../assets";

const StyledLoginPage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#fff",
  flexDirection: "column",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "white",
  backgroundColor: "#EC7C34",
  border: "1px solid #EC7C34",
  "&:hover": {
    background: "none",
    color: "#EC7C34",
  },
}));

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission

    // Prepare the data for login API call
    const loginData = {
      username: username,
      password: password,
    };

    try {
      console.log(loginData);
      const userData = await login(loginData);
      localStorage.setItem("@token", userData.token);
      console.log("User Data:", userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  const handleForgetPass = () => {
    const data = { userEmail: "nomibabaoo82@gmail.com" };
    try {
      forgetPass({ data }).then((res) => console.log(res));
      alert("Check your mail and reset your password");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLoginPage>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "center",
          backgroundSize: "contain", // Adjust the background size
          backgroundRepeat: "no-repeat", // Prevent repetition
          width: "400px",
          marginBottom: "1rem",
          justifyContent: "center",
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            maxWidth: "200px",
            filter: "drop-shadow(2px 4px 6px black)",
          }}
        />
      </Box>
      <Container
        sx={{
          alignItems: "center",
          textAlign: "center",
          maxWidth: { xl: "md", lg: "md", sm: "sm", xs: "sm" },
        }}
      >
        <form onSubmit={handleLogin}>
          <StyledTextField
            placeholder="Username"
            variant="outlined"
            fullwidth="true"
            sx={{ mb: 2 }}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <StyledTextField
              placeholder="Password"
              variant="outlined"
              type="password"
              fullwidth="true"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton variant="contained" fullwidth="true" type="submit">
              Login
            </StyledButton>
            <Typography
              sx={{
                color: "#EC7C34",
                marginTop: "5px",
                cursor: "pointer",
              }}
              onClick={handleForgetPass}
            >
              Forgot Password
            </Typography>
          </Box>
        </form>
      </Container>
    </StyledLoginPage>
  );
};
