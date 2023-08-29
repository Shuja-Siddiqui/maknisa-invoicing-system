import React, { useState, useEffect } from "react";

import { getInvoices } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { Button } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Define your data creation function
function createData(_id, Client_Name, House_No, Area, Status, Actions) {
  return { _id, Client_Name, House_No, Area, Status, Actions };
}

export const Invoices = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const viewInvoice = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/print-invoice");
  };

  useEffect(() => {
    getInvoices()
      .then((res) => {
        const rows = res.map((data) =>
          createData(
            data?._id,
            data?.client_name,
            data?.location?.city,
            data?.location?.area,
            data?.status
          )
        );
        setData(rows);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data, "data");
  return (
    <>
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
            <Button onClick={() => viewInvoice(id)}>
              <RemoveRedEye
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
