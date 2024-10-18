import React from "react";
import { Card, Box, Typography } from "@mui/material";

export const StatusCard = ({ text, number, bgcolor, icon , op }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        background: "white",
        width: { xl: "20%", lg: "20%", md: "20%", sm: "30%", xs: "30%" },
        height: { xl: "1%", lg: "1%", md: "1%", sm: "100%", xs: "100%" },
        color: "#F98E0A",
        border: "1px solid black",
      }}
    >
      <Box sx={{ position: "relative", padding: "20px", textAlign: "center" }}>
        {/* Icon in the background */}
        <Box
          sx={{
            color:  bgcolor,
            position: "absolute", // Place icon in the background
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust position to center
            opacity: op || 0.5, // Adjust the opacity to make it look like a background
            zIndex: 1, // Keep it behind the text
          }}
        >
          {icon}
        </Box>

        {/* Typography content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography>{text}</Typography>
          <Typography sx={{ fontSize: "30px" }}>{number}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
