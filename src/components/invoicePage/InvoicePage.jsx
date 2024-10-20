import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Box,
  TableCell,
} from "@mui/material";
import pic from "../../assets/png/wallpaperflare.com_wallpaper.jpg";
import logo from "../../assets/png/maknisa-removebg-preview.png";
import { getInvoiceById } from "../../api";
import { initialFormState } from "../invoiceForm";
import moment from "moment/moment";
import { Logo } from "../../assets";
import { StyledButton } from "../../pages";
import { url } from "../../api/config";
import { Home, WhatsApp } from "@mui/icons-material";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import consoleDotLogo from "../../assets/png/logo.png";

export const InvoicePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [totalPrice, setTotalPrice] = useState(0);
  const parsed = queryString.parse(window.location.search);
  const [show, setShow] = useState(parsed?.show);

  useLayoutEffect(() => {
    setShow(parsed?.show || parsed?.id);
  }, [parsed]);
  const fetchData = () => {
    const id = parsed?.id || localStorage.getItem("@invoiceId");
    if (parsed?.id) {
      localStorage.setItem("@invoiceId", parsed?.id);
    }
    if (id) {
      getInvoiceById(id).then((res) => {
        setFormData(res);
        setTotalPrice((prev) => {
          return 0;
        });
        res?.items.forEach((i) => {
          setTotalPrice((prev) => {
            return (
              parseFloat(prev) + parseFloat(i.rate) * parseFloat(i.quantity)
            );
          });
        });
      });
    }
  };

  const StyledTableCell = styled(TableCell)(() => ({
    border: "1px solid #d7d7d7",
  }));

  useEffect(() => {
    if (parsed.print === "true") {
      setTimeout(() => window.print(), 300);
    }
  });

  // useEffect(() => {
  //   if (printable) {
  //     setTimeout(() => window.print(), 300);
  //   }
  // }, [printable]);

  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Box
        id="invoice-content"
        // component={Paper}
        // sx={{ marginTop: "20px", padding: "1rem 2rem" }}
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
            {formData?.location?.details !== "" && (
              <Typography variant="body1" sx={{ color: "#000000" }}>
                <strong>House No: </strong>
                {formData?.location?.details}
              </Typography>
            )}
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Address: </strong>
              {`${formData?.location?.area}, ${formData?.location?.city}, ${formData?.location?.province}`}
              <br />
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
              <strong>InvoiceID:</strong> {formData.invoice_id}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Category:</strong> {formData.category}
            </Typography>
            <Typography variant="body1" sx={{ color: "#000000" }}>
              <strong>Date:</strong>{" "}
              {moment(formData?.createdAt).format("DD-MM-YYYY")}
            </Typography>
            {moment(formData?.updatedAt).format("DD-MM-YYYY") >
              moment(formData?.createdAt).format("DD-MM-YYYY") && (
              <Typography variant="body1" sx={{ color: "#000000" }}>
                <strong>UpdatedDate:</strong>{" "}
                {moment(formData?.updatedAt).format("DD-MM-YYYY")}
              </Typography>
            )}
          </Box>
        </Box>
        {/* <TableContainer component={Paper}> */}
        <Table>
          <TableHead sx={{ bgcolor: "#EC7C34" }}>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: "18px" }}
              >
                #
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: "18px" }}
              >
                Description
              </StyledTableCell>
              {formData?.payment !== "FixedPayment" && (
                <>
                  <StyledTableCell
                    align="center"
                    sx={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    Dimensions
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    Rate
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    Quantity
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    Price
                  </StyledTableCell>
                </>
              )}
              <StyledTableCell
                align="center"
                sx={{ fontWeight: "bolder", fontSize: "18px" }}
              >
                Picture
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData?.items.map((row, index) => (
              <TableRow key={row.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center" sx={{ maxWidth: "5rem" }}>
                  {row.description}
                </StyledTableCell>
                {formData?.payment !== "FixedPayment" && (
                  <>
                    {row.dimension !== "" ? (
                      <StyledTableCell align="center">
                        {row.dimension || "-"}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center">
                        <h3>-</h3>
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      {row.rate || "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity || "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantity * row.rate}
                    </StyledTableCell>
                  </>
                )}
                <StyledTableCell align="center">
                  {row?.image === "null" || !row.image ? (
                    <h3>-</h3>
                  ) : (
                    <img
                      src={url + "/files/" + row?.image}
                      alt={`Pic ${row.id}`}
                      style={{ maxWidth: "150px" }}
                    />
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
        <Table>
          {formData?.payment === "FixedPayment" ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  <b>Total Amount</b>
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {formData?.price}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Total Amount
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {totalPrice}
                </TableCell>
              </TableRow>
              {formData?.discount > 0 ? (
                <>
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      <b>Discount</b>
                    </TableCell>
                    <TableCell align="center">{formData.discount}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                      align="right"
                    >
                      <b>Total Amount</b>
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                      align="center"
                    >
                      {totalPrice - (totalPrice / 100) * formData.discount}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      <b>Discount</b>
                    </TableCell>
                    <TableCell align="center">0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      <b>Total Amount</b>
                    </TableCell>
                    <TableCell align="center">
                      {totalPrice - (totalPrice / 100) * 0}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          )}
        </Table>
        <Box sx={{ margin: "1rem 0 3rem 0" }}>
          <Typography component="h1" variant="h6">
            <strong>Terms & Conditions</strong>
          </Typography>
          <Typography
            sx={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: formData?.terms }}
          />
        </Box>
        <hr />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            color: "grey",
            marginTop: "7px",
          }}
        >
          <Typography align="center" sx={{ fontSize: "12px" }}>
            <strong>
              Invoice System Developed by{" "}
              <img
                src={consoleDotLogo}
                alt="ConsoleDot logo"
                style={{
                  width: "20px",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              />{" "}
              ConsoleDot Pvt-Ltd (0327-4067437)
            </strong>
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            <strong>www.consoledot.com</strong>
          </Typography>
        </Box>
      </Box>
      {!show && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={() => {
              navigate(`/dashboard`);
            }}
          >
            <Home />
          </StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={() => {
              navigate(`/print-invoice?id=${formData?._id}&show=false`);
              setTimeout(() => {
                window.print();
                navigate(`/print-invoice`);
              }, 300);
            }}
          >
            Print Invoice
          </StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={() => {
              window.open(
                `https://api.whatsapp.com/send?text=${window.location.origin}/print-invoice?id=${formData?._id}`
              );
            }}
          >
            <WhatsApp />
          </StyledButton>
        </Box>
      )}
    </Container>
  );
};
