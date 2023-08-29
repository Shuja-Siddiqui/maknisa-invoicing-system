import React, { useState, useLayoutEffect, useEffect } from "react";

import { getDrafts } from "../../api/config";
import { InvoiceTable } from "../invoiceTable";

// Define your data creation function
function createData(Invoice_Id, Client_Name, House_No, Area, Status, Actions) {
  return { Invoice_Id, Client_Name, House_No, Area, Status, Actions };
}

export const InvoiceDrafts = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDrafts()
      .then((res) => {
        setInvoicesData(res);
        // Create rows from fetched data
        const rows = res.map((data) =>
          createData(
            data?.invoice_id,
            data?.client_name,
            data?.location?.city,
            data?.location?.area,
            data?.status,
            data?.actions
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
        headings={[
          "Invoice_Id",
          "Client_Name",
          "House_No",
          "Area",
          "Status",
          "Actions",
        ]}
      />
    </>
  );
};
