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
import { Logo } from "../../assets";
import { StyledButton } from "../../pages";

export const InvoicePage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [printable, setPrintable] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = () => {
    const id = localStorage.getItem("@invoiceId");
    if (id) {
      getInvoiceById(localStorage.getItem("@invoiceId")).then((res) => {
        setFormData(res);
        setTotalPrice((prev) => {
          return 0;
        });
        res?.items.forEach((i) => {
          setTotalPrice((prev) => {
            return parseFloat(prev) + parseFloat(i.price);
          });
        });
        setPrintable(true);
      });
    }
  };

  useEffect(() => {
    if (printable) {
      // setTimeout(() => window.print(), 300);
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
            justifyContent: "center",
          }}
        >
          <Typography
            component={"a"}
            href="https://www.maknisa.com"
            sx={{ color: "#000", textDecoration: "none" }}
          >
            <strong>www.maknisa.com</strong>
          </Typography>
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
              <strong>Name:</strong> {formData?.client_name}
              <br />
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Address:</strong>
              {`${formData?.location?.area}, ${formData?.location?.city}, ${formData?.location?.province}`}
              <br />
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
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
            <TableRow>
              <TableCell colSpan={5} align="right">
                <b>Net Amount</b>
              </TableCell>
              <TableCell align="center">{totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <b>Discount</b>
              </TableCell>
              <TableCell align="center">{formData.discount}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <b>Total Amount</b>
              </TableCell>
              <TableCell align="center">
                {totalPrice - (totalPrice / 100) * formData.discount}
              </TableCell>
            </TableRow>
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
            <strong>
              Invoice System Developed by ConsoleDot Pvt-Ltd (0327-4067437)
            </strong>
          </Typography>
          <Typography>
            <strong>www.consoledot.com</strong>
          </Typography>
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
