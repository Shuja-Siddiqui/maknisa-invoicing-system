import React from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";
import pic from "../../assets/png/wallpaperflare.com_wallpaper.jpg";
import logo from "../../assets/png/maknisa-removebg-preview.png";
import { Logo } from "../../assets";
import { StyledButton } from "../../pages";

export const InvoicePage = () => {
  const tableData = [
    { id: 1, pic: "", dimension: "10x15", price: "$50" },
    { id: 2, pic: "pic2.jpg", dimension: "12x18", price: "$65" },
  ];

  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", padding: "1rem 2rem" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{
              maxWidth: "100px",
              filter: "drop-shadow(2px 4px 6px black)",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt={pic} style={{ maxWidth: "250px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Name:</strong> John Doe
              <br />
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Address:</strong> 123 Main St
              <br />
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>House No:</strong>456
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>InvoiceID:</strong> ######
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Date:</strong> 12-13-23
            </Typography>
          </Box>
        </Box>

        <Table>
          <TableHead sx={{ bgcolor: "#EC7C34" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Dimensions</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dimension}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <img
                    src={pic}
                    alt={`Pic ${row.id}`}
                    style={{ maxWidth: "150px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography align="center">
           <strong> Invoice System Developed by ConsoleDot Pvt-Ltd (0327-4067437)</strong>
          </Typography>
          <Typography><strong>www.consoledot.com</strong></Typography>
        </Box>
      </TableContainer>
      <Box
        sx={{
          marginBottom: "20px",
        }}
      >
        <StyledButton type="submit" variant="contained" color="primary">
          Print Invoice
        </StyledButton>
      </Box>
    </Container>
  );
};
