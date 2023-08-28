import { InvoiceTable } from "../invoiceTable";

function createData(Invoice_Id, Client_Name, House_No, Area, Status, Actions) {
  return { Invoice_Id, Client_Name, House_No, Area, Status, Actions };
}
const rows = [createData(1, "Frozen yoghurt", 159, 6.0, 24)];
export const Invoices = () => {
  return (
    <>
      <InvoiceTable
        rows={rows}
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
