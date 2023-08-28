import React from "react";
import { Card, CardContent, Button, styled, Box } from "@mui/material";
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
    <Box
      onClick={actions}
      sx={{
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        cursor: "pointer",
      }}
    >
      <Card
        sx={{
          width: 300,
          backgroundColor: color || "#fff",
          borderRadius: "5%",
          border: "1px solid white",
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
    </Box>
  );
};
