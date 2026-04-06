import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { drawInvoiceTemplate } from "../../api";

const O = "#F98E0A";
const O10 = "rgba(249,142,10,0.10)";
const O20 = "rgba(249,142,10,0.20)";
const BLACK = "#0D0D0D";
const WHITE = "#FFFFFF";
const G50 = "#F9F9F9";
const G100 = "#F0F0F0";
const G200 = "#E2E2E2";
const G400 = "#ABABAB";
const G700 = "#3A3A3A";
const G900 = "#161616";
const GREEN = "#16A34A";
const GREEN_BG = "rgba(22,163,74,0.10)";
const RED = "#DC2626";
const RED_BG = "rgba(220,38,38,0.10)";


// export const InvoiceButtonCard = ({ text, color, path, action }) => {
//   const navigate = useNavigate();


//   return (
//     <Card
//       sx={{
//         backgroundColor: color || "#FFFFFF",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#F98E0A",
//         cursor: "pointer",
//         border: "1px solid #F98E0A",
//         color: "black",
//         width: { xl: "40%", lg: "40%", md: "40%", sm: "100%", xs: "100%" },
//         height: { xl: "1%", lg: "1%", md: "1%", sm: "100%", xs: "100%" },
//         "&:hover": {
//           background: "none",
//           color: "black",
//           border: "1px solid black",
//         },
//       }}
//       onClick={handleCardClick}
//     >
//         <Box sx={{padding: "8px" }}>
//           <Typography>{text}</Typography>
//         </Box>
//     </Card>
//   );
// };


export const InvoiceButtonCard = ({
  text,
  path,
  action,
  icon,
  variant = "primary",
}) => {
  const navigate = useNavigate();

  const isPrimary = variant === "primary";

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
    <Button
      onClick={handleCardClick}
      startIcon={icon}
      sx={{
        background: isPrimary ? BLACK : WHITE,
        color: isPrimary ? WHITE : G700,
        fontWeight: 700,
        fontSize: 13,
        px: 3,
        py: 1.2,
        width: "100%",
        borderRadius: "12px",
        textTransform: "none",
        letterSpacing: "-0.01em",
        border: isPrimary
          ? `2px solid ${O}`
          : `1.5px solid ${G200}`,
        boxShadow: isPrimary
          ? `0 4px 20px ${O20}`
          : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.18s",
        "&:hover": {
          background: isPrimary ? O : G50,
          color: isPrimary ? BLACK : G700,
          borderColor: isPrimary ? O : G400,
          transform: "translateY(-2px)",
          boxShadow: isPrimary
            ? `0 6px 28px ${O20}`
            : "0 6px 20px rgba(0,0,0,0.10)",
        },
      }}
    >
      {text}
    </Button>
  );
};