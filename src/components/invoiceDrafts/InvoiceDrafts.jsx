import React, { useState, useLayoutEffect, useEffect } from "react";

import { getDrafts, removeInvoice } from "../../api";
import { InvoiceTable, WhiteTextTableCell } from "../invoiceTable";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define your data creation function
function createData(_id, Client_Name, House_No, Area, Status, Actions) {
  return { _id, Client_Name, House_No, Area, Status, Actions };
}
export const InvoiceDrafts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const updateData = (id) => {
    localStorage.setItem("@invoiceId", id);
    navigate("/invoice-form");
  };
  const deleteDraft = (id) => {
    removeInvoice(id)
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };
  const fetchData = () => {
    getDrafts()
      .then((res) => {
        // Create rows from fetched data
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
  };

  useEffect(() => {
    fetchData();
  }, []);
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
