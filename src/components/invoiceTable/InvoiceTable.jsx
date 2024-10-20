import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Box,
  Container,
} from "@mui/material";
import styled from "styled-components";
import { InvoiceButtonCard } from "../invoiceButtonCard";

export const StyledTableCell = styled(TableCell)({
  borderBottom: "1px solid #f98e0a",
  color: "#f98e0a",
});

export const WhiteTextTableCell = styled(TableCell)({
  color: "black",
});

export const InvoiceTable = ({ rows, headings, Actions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);
  const filteredRows = rows?.filter((row) =>
    headings.some((heading) =>
      row[heading]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width:"100%",
            alignItems: "center", 
            borderBottom: "1px solid #f98e0a",
            gap: "10px",
            padding: "20px 0",
            flexWrap: {
              xl: "nowrap",
              lg: "nowrap",
              md: "nowrap",
              sm: "wrap",
              xs: "wrap",
            }
          }}
        >
          <Box
            sx={{
              color: "#f98e0a",
              width: {
                xl: "50%",
                lg: "50%",
                md: "50%",
                sm: "100%",
                xs: "100%",
              }, 
              fontSize: "30px",
              display: "flex",
              alignItems: "center", 
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{
                marginLeft: "8px",
                width: "100%", 
                padding: "10px 15px", 
                borderRadius: "5px",
                border: "1px solid black",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: {
                xl: "50%",
                lg: "50%",
                md: "50%",
                sm: "100%",
                xs: "100%",
              }, 
              justifyContent: "center", 
              alignItems: "center",
              gap: "10px",
            }}
          >
            <InvoiceButtonCard
              text={"+ ADD New"}
              color={"white"}
              path={"/invoice-form"}
              action={"newForm"}
            />
            <InvoiceButtonCard
              text={"Draft Invoice"}
              color={"white"}
              path={"/drafts"}
              action={"draftForm"}
            />
          </Box>
        </Box>
      </Container>
      <TableContainer component={Paper} sx={{ bgcolor: "#8080802b" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{background:"#f98e0a"}}> 
            <TableRow>
              <StyledTableCell
                sx={{
                  borderBottom: "1px solid #f98e0a",
                  color: "black",
                  width: "20%",
                  fontSize: "large",
                }}
                align={"center"}
              >
                #
              </StyledTableCell>
              {headings?.map((_, index) =>
                _ !== "_id" ? (
                  <StyledTableCell
                    sx={{
                      borderBottom: "1px solid #f98e0a",
                      color: "black",
                      width: "15%",
                      fontSize: "large",
                    }}
                    align={_ === "name" ? "left" : "center"}
                    key={index}
                  >
                    {_.replace("_", " ")}
                  </StyledTableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <WhiteTextTableCell
                    align={"center"}
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "1px solid #f98e0a",
                    }}
                  >
                    {row?.invoice_id}
                  </WhiteTextTableCell>
                  {headings.map((_, i) =>
                    _ === "Actions" ? (
                      <Actions id={row["_id"]} />
                    ) : _ === "_id" ? null : (
                      <WhiteTextTableCell
                        align={_ === "name" ? "left" : "center"}
                        key={i}
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "1px solid #f98e0a",
                        }}
                      >
                        {row[_]}
                      </WhiteTextTableCell>
                    )
                  )}
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell
                  colSpan={5}
                  sx={{
                    textAlign: "center",
                    fontSize: "50px",
                    color: "#dcddde",
                  }}
                ></StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderBottom: "1px solid #f98e0a", color: "black" }}
        />
    </>
  );
};
