import React from "react";
import { Card, Box, Typography } from "@mui/material";
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
        background: "#F98E0A",
        cursor: "pointer",
        border: "1px solid #F98E0A",
        color: "black",
        width: { xl: "40%", lg: "40%", md: "40%", sm: "100%", xs: "100%" },
        height: { xl: "1%", lg: "1%", md: "1%", sm: "100%", xs: "100%" },
        "&:hover": {
          background: "none",
          color: "black",
          border: "1px solid black",
        },
      }}
      onClick={handleCardClick}
    >
        <Box sx={{padding: "8px" }}>
          <Typography>{text}</Typography>
        </Box>
    </Card>
  );
};
