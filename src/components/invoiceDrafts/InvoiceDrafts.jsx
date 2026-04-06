import React, { useState, useEffect } from "react";

import { getDrafts, removeInvoice } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { ArrowBack, Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

// Define your data creation function
function createData(
  _id,
  Client_Name,
  House_No,
  Location,
  Area,
  invoice_id,
  Created_By,
  Actions,
) {
  return {
    _id,
    Client_Name,
    House_No,
    Location,
    Area,
    invoice_id,
    Created_By,
    Actions,
  };
}
export const InvoiceDrafts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const updateData = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/invoice-form");
  };
  const deleteDraft = (id) => {
    const userConfirmed = window.confirm(`Do you want to delete !`);

    if (userConfirmed) {
      // remove
      removeInvoice(id)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };
  const fetchData = () => {
    getDrafts()
      .then((res) => {
        // Create rows from fetched data
        const rows = res.map((data) =>
          createData(
            data?._id,
            data?.client_name,
            data?.location?.details,
            data?.location?.location,
            data?.location?.area + "," + data?.location?.city,
            data?.invoice_id,
            data?.createdBy,
          ),
        );
        setData(rows);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const actions = (row) => [
    {
      title: "Edit",
      icon: <Edit sx={{ fontSize: 14 }} />,
      fn: () => updateData(row._id),
      hc: O,
      hbg: O10,
    },
    {
      title: "Delete",
      icon: <Delete sx={{ fontSize: 14 }} />,
      fn: () => deleteDraft(row._id),
      hc: RED,
      hbg: RED_BG,
    },
  ];

  return (
    <>
      <Box
        sx={{ color: "#F98E0A", cursor: "pointer", mb: "20px" }}
        onClick={() => window.history.back()}
      >
        <ArrowBack />
      </Box>

      <InvoiceTable
        data={data}
        headings={[
          "_id",
          "Client_Name",
          "House_No",
          "Location",
          "Area",
          "Created_By",
          "Actions",
        ]}
        // Actions={({ id }) => (
        //   <WhiteTextTableCell
        //     align={"center"}
        //     component="th"
        //     scope="row"
        //     sx={{
        //       borderColor: "#f98e0a",
        //       color: "#ffffff",
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <Button onClick={() => updateData(id)}>
        //       <Edit
        //         sx={{
        //           color: " #f98e0a",
        //         }}
        //       />
        //     </Button>
        //     <Button onClick={() => deleteDraft(id)}>
        //       <Delete
        //         sx={{
        //           color: " #f98e0a",
        //         }}
        //       />
        //     </Button>
        //   </WhiteTextTableCell>
        // )}
        actions={actions}
        tableHeadingText="Draft Invoices"
      />
    </>
  );
};
