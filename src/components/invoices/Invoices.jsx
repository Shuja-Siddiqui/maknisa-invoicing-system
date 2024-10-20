import React, { useState, useEffect } from "react";
import { getInvoices, removeInvoice, updateStatus } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { Box, Button } from "@mui/material";
import {
  Delete,
  Edit,
  RemoveRedEye,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StatusCard } from "../statusCards";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
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
    const userConfirmed = window.confirm(`Do you want to delete !`);

    if (userConfirmed) {
      removeInvoice(id)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const handleStatus = ({ invoiceStatus, statusId }) => {
    updateStatus({ invoiceStatus, statusId })
      .then((res) => {
        // Manually update the status in the data array without refreshing
        const updatedData = data.map((item) => {
          if (item._id === statusId) {
            return { ...item, Status: invoiceStatus };
          }
          return item;
        });
        setData(updatedData);
      })
      .catch((error) => console.log(error));
  };

  let pending = 0;
  let approved = 0;
  let reject = 0;

  data.forEach((item) => {
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
            data?.location?.area + "," + data?.location?.city,
            data?.category,
            data?.currentStatus,
            data?.invoice_id
          )
        );
        setData(rows);
      })
      .catch((err) => console.log(err));
  };

  // Polling mechanism: Fetch data periodically
  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 2000);

    // Cleanup: Stop polling when the component unmounts
    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <StatusCard
          text="APPROVED"
          number={approved}
          icon={<CheckBoxIcon sx={{ fontSize: "100vh" }} />}
        />
        <StatusCard
          text="PENDING"
          number={pending}
          icon={<AccessAlarmIcon sx={{ fontSize: "20vh" }} />}
          bgcolor="black"
          op="0.1"
        />
        <StatusCard
          text="REJECTED"
          number={reject}
          icon={<CheckBoxIcon sx={{ fontSize: "100vh" , transform: "rotate(180deg)"}} />}
        />
        {/* <Typography variant="h6" component="div">
          APPROVED : {approved}
        </Typography>
        <Typography variant="h6" component="div">
          REJECTED : {reject}
        </Typography>
        <Typography variant="h6" component="div">
          PENDING : {pending}
        </Typography> */}
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
