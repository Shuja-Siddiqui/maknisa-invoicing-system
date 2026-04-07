import React from "react";
import { Card, Box, Typography } from "@mui/material";
// ─── Design Tokens ────────────────────────────────────────────────────────────
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

// export const StatusCard = ({ text, number, bgcolor, icon , op }) => {
//   return (
//     <Card
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         cursor: "pointer",
//         background: "white",
//         width: { xl: "20%", lg: "20%", md: "20%", sm: "30%", xs: "30%" },
//         height: { xl: "1%", lg: "1%", md: "1%", sm: "100%", xs: "100%" },
//         color: "#F98E0A",
//         border: "1px solid black",
//       }}
//     >
//       <Box sx={{ position: "relative", padding: "20px", textAlign: "center" }}>
//         {/* Icon in the background */}
//         <Box
//           sx={{
//             color:  bgcolor,
//             position: "absolute", // Place icon in the background
//             top: "50%", // Center vertically
//             left: "50%", // Center horizontally
//             transform: "translate(-50%, -50%)", // Adjust position to center
//             opacity: op || 0.5, // Adjust the opacity to make it look like a background
//             zIndex: 1, // Keep it behind the text
//           }}
//         >
//           {icon}
//         </Box>

//         {/* Typography content */}
//         <Box sx={{ position: "relative", zIndex: 2 }}>
//           <Typography>{text}</Typography>
//           <Typography sx={{ fontSize: "30px" }}>{number}</Typography>
//         </Box>
//       </Box>
//     </Card>
//   );
// };
// ─── Stat Card ────────────────────────────────────────────────────────────────
export const StatusCard = ({ label, value, sub, icon, variant = "default" }) => {
  const isSolid = variant === "orange";
  const isDark = variant === "dark";
  const isRed = variant === "rejected";
  const bg = isSolid
    ? O
    : isDark
      ? BLACK
      : isRed
        ? " rgba(255, 188, 100, 0.95)"
        : WHITE;
  const textMain = isSolid ? BLACK : isDark ? WHITE : isRed ? WHITE : G900;
  const textSub = isSolid
    ? "rgba(0,0,0,0.50)"
    : isDark
      ? G400
      : isRed
        ? WHITE
        : G400;
  const iconBg = isSolid
    ? "rgba(0,0,0,0.12)"
    : isDark
      ? O10
      : isRed
        ? WHITE
        : O10;
  const iconClr = isSolid ? BLACK : isRed ? " rgba(255, 0, 0, 0.95)" : O;
  const border = isSolid
    ? "none"
    : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : G200}`;

  return (
    <Box
      sx={{
        background: bg,
        border,
        borderRadius: "16px",
        p: "20px 22px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        boxShadow: isSolid
          ? `0 8px 32px ${O20}`
          : isDark
            ? "0 4px 20px rgba(0,0,0,0.35)"
            : "0 2px 10px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isSolid
            ? `0 14px 40px ${O20}`
            : "0 8px 24px rgba(0,0,0,0.10)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: `20px solid ${isSolid ? "rgba(0,0,0,0.07)" : isDark ? O10 : isRed ? " rgba(252, 179, 84, 0.95)" : O10}`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconClr,
          "& svg": { fontSize: 18 },
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 800,
          color: textMain,
          lineHeight: 1,
          mb: 0.4,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: textMain,
          opacity: 0.7,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 11, color: textSub }}>{sub}</Typography>
    </Box>
  );
};