import React, { useLayoutEffect } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { drawInvoiceTemplate } from "../../api";

export const InvoiceButtonCard = ({ text, color, path, action }) => {
  const navigate = useNavigate();

  const handleCardClick = async () => {
    switch (action) {
      case "newForm":
        drawInvoiceTemplate()
          .then((res) => {
            localStorage.setItem("@invoiceId", res._id);
            navigate(path);
          })

          .catch((err) => console.log(err));
        break;
      default:
        navigate(path);
        break;
    }
  };
  return (
    <Card
      sx={{
        backgroundColor: color || "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem 2rem",
        cursor: "pointer",
        border: "1px solid #F98E0A",
        width: "33%",
        height: "33%",
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box style={{ marginTop: "1rem" }}>
          <Typography variant="h4" sx={{ color: "#F98E0A" }}>
            {text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
