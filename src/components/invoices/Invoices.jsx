import React, { useState, useEffect } from "react";

import { getInvoices, removeInvoice, updateStatus } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { Box, Button, Typography } from "@mui/material";
import { Delete, Edit, RemoveRedEye, ThumbDown, ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Define your data creation function
function createData(
  _id,
  Client_Name,
  House_No,
  Area,
  Category,
  Status,
  invoice_id,
  Actions
) {
  return {
    _id,
    Client_Name,
    House_No,
    Area,
    Category,
    Status,
    invoice_id,
    Actions,
  };
}

export const Invoices = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const viewInvoice = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/print-invoice");
  };
  const updateData = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/invoice-form");
  };
  const deleteDraft = (id) => {
    removeInvoice(id)
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };
  const handleStatus = ({ invoiceStatus, statusId }) => {
    updateStatus({ invoiceStatus, statusId })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  let pending = 0;
  let approved = 0;
  let reject = 0;
  data.forEach((item, index) => {
    if (item?.Status === "Approve") {
      approved++;
    } else if (item?.Status === "Reject") {
      reject++;
    } else {
      pending++;
    }
  });
  const fetchData = () => {
    getInvoices()
      .then((res) => {
        const rows = res.map((data) =>
          createData(
            data?._id,
            data?.client_name,
            data?.location?.details,
            data?.location?.area +"," + data?.location?.city,
            data?.category,
            data?.currentStatus,
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
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "3rem",
          flexWrap: "wrap",
          background: "#EC7C34",
          color: "white",
        }}
      >
        <Typography variant="h6" component="div">
          APPROVED : {approved}
        </Typography>
        <Typography variant="h6" component="div">
          REJECTED : {reject}
        </Typography>
        <Typography variant="h6" component="div">
          PENDING : {pending}
        </Typography>
      </Box>
      <InvoiceTable
        rows={data}
        headings={[
          "_id",
          "Client_Name",
          "House_No",
          "Area",
          "Category",
          "Status",
          "Actions",
        ]}
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
            <Button onClick={() => viewInvoice(id)}>
              <RemoveRedEye
                sx={{
                  color: " #f98e0a",
                }}
              />
            </Button>
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
            <Button
              onClick={() =>
                handleStatus({ invoiceStatus: "Approve", statusId: id })
              }
            >
              <ThumbUp
                sx={{
                  color: "green",
                }}
              />
            </Button>
            <Button
              onClick={() =>
                handleStatus({ invoiceStatus: "Reject", statusId: id })
              }
            >
              <ThumbDown
                sx={{
                  color: "red",
                }}
              />
            </Button>
          </WhiteTextTableCell>
        )}
      />
    </>
  );
};
