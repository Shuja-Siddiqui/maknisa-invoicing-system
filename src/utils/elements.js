import { Typography } from "@mui/material";
import styled from "styled-components";

export const StyledHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

export const StyledSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: "#F98E0A",
}));

export const StyledParagraph = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
}));
