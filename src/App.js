import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardWrapper, Login, InvoiceFormWrapper } from "./pages";
import { InvoiceTable } from "./components";
import { RemoveRedEye } from "@mui/icons-material";

function createData(Invoice_Id, Client_Name, House_No, Area, Status, Actions) {
  return { Invoice_Id, Client_Name, House_No, Area, Status, Actions };
}
const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24),
];
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/invoice-form" element={<InvoiceFormWrapper />} />
        <Route
          path="/invoice-table"
          element={
            <InvoiceTable
              rows={rows}
              headings={[
                "Invoice_Id",
                "Client_Name",
                "House_No",
                "Area",
                "Status",
              ]}
              Actions={RemoveRedEye}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
