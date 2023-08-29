import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { getInvoiceById } from "../../api";
import { initialFormState } from "../invoiceForm";
import moment from "moment/moment";

export const InvoicePage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [printable, setPrintable] = useState(false);

  const fetchData = () => {
    const id = localStorage.getItem("@invoiceId");
    if (id) {
      getInvoiceById(localStorage.getItem("@invoiceId")).then((res) => {
        setFormData(res);
        setPrintable(true);
      });
    }
  };

  useEffect(() => {
    if (printable) {
      setTimeout(() => window.print(), 300);
    }
  }, [printable]);

  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <img src={logo} alt={pic} style={{ maxWidth: "300px" }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Name:</strong> {formData?.client_name}
              <br />
              <strong>Address:</strong>
              {`${formData?.location?.area}, ${formData?.location?.city}, ${formData?.location?.province}`}
              <br />
              <strong>House No:</strong>
              {formData?.location?.details}
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
              <strong>Date:</strong>{" "}
              {moment(formData?.updatedAt).format("DD-MM-YYYY")}
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
            {formData.items.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
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
      </TableContainer>
    </Container>
  );
};
