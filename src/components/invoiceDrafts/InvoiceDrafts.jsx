import React, { useState, useEffect } from "react";

import { getDrafts, removeInvoice } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define your data creation function
function createData(_id, Client_Name, House_No, Area, invoice_id, Actions) {
  return { _id, Client_Name, House_No, Area, invoice_id, Actions };
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
            data?.location?.area + "," + data?.location?.city,
            data?.invoice_id
          )
        );
        setData(rows);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{ color: "#F98E0A", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        <ArrowBack />
      </Box>
      <InvoiceTable
        rows={data}
        headings={["_id", "Client_Name", "House_No", "Area", "Actions"]}
        Actions={({ id }) => (
          <WhiteTextTableCell
            align={"center"}
            component="th"
            scope="row"
            sx={{
              borderColor: "#f98e0a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => updateData(id)}>
              <Edit
                sx={{
                  color: " #f98e0a",
                }}
              />
            </Button>
            <Button onClick={() => deleteDraft(id)}>
              <Delete
                sx={{
                  color: " #f98e0a",
                }}
              />
            </Button>
          </WhiteTextTableCell>
        )}
      />
    </>
  );
};
