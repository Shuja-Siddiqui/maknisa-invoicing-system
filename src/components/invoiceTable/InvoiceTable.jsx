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
} from "@mui/material";
import styled from "styled-components";

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
    <TableContainer component={Paper} sx={{ bgcolor: "white" }}>
      <div
        sx={{
          borderBottom: "1px solid #f98e0a",
          color: "#f98e0a",
          width: "20%",
        }}
        align={"center"}
      >
        Search
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{ marginLeft: "8px", padding: "2px" }}
        />
      </div>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              sx={{
                borderBottom: "1px solid #f98e0a",
                color: "#f98e0a",
                width: "20%",
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
                    color: "#f98e0a",
                    width: "20%",
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
                  {index + 1}
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
              <StyledTableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
};
