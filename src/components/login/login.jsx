import React from "react";
import { Container, TextField, Button, styled, Box } from "@mui/material";
import image from "../../assets/png/maknisa-logo.png";
const StyledLoginPage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#000",
  flexDirection: "column",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#FA9105",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FA9105",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FA9105",
    },
    "&:hover fieldset": {
      borderColor: "#0a0909",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
  "& label": {
    color: "white", // Initial label color
  },
  "& input": {
    color: "white",
  },
  marginBottom: theme.spacing(2),
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
        <form>
          <StyledTextField
            label="Username"
            variant="outlined"
            fullWidth
            required
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
          />
          <StyledButton variant="contained" fullWidth type="submit">
            Login
          </StyledButton>
        </form>
      </Container>
    </StyledLoginPage>
  );
};
