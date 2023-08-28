import { Typography,TextField } from "@mui/material";
import styled from "styled-components";

export const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#F98E0A",
}));

export const StyledSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: "#F98E0A",
}));

export const StyledParagraph = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
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
      borderColor: "#ffffff",
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
}));
