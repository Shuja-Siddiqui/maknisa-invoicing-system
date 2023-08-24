import React from "react";
import { Card, CardContent, Button, styled } from "@mui/material";
import { StyledHeading } from "../../utils/elements";
export const StyledActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "white",
  backgroundColor: "#F98E0A",
  "&:hover": {
    background: "none",
    border: "1px solid #F98E0A",
  },
}));
export const InvoiceButtonCard = ({ color, actions, text }) => {
  return (
    <div onClick={actions}>
      <Card
        sx={{
          maxWidth: 300,
          backgroundColor: color || "#fff",
          padding: {
            xl: "2rem",
            lg: "2rem",
            md: "2rem",
            sm: "1rem",
            xs: "0.8rem",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledHeading>{text}</StyledHeading>
        </CardContent>
      </Card>
    </div>
  );
};
