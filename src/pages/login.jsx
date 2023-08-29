import React from "react";
import { Container, Button, styled, Box } from "@mui/material";
import image from "../assets/png/maknisa-logo.png";
import { StyledTextField } from "../utils/elements";
import { useNavigate } from "react-router-dom";
import { forgetPass, login } from "../api/config";
import { useState } from "react";
const StyledLoginPage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#000",
  flexDirection: "column",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "white",
  backgroundColor: "#F98E0A",
  "&:hover": {
    background: "none",
    border: "1px solid #F98E0A",
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
        <form onSubmit={handleLogin}>
          <StyledTextField
            label="Username"
            variant="outlined"
            fullwidth="true"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            label="Password"
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
        </form>
        <StyledButton variant="contained" fullwidth="true" onClick={handleForgetPass}>
          Forgot Password
        </StyledButton>
      </Container>
    </StyledLoginPage>
  );
};
