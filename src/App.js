import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  InvoiceFormWrapper,
  AllDrafts,
  AllInvoices,
  DashboardWrapper,
} from "./pages";
import { InvoiceDrafts, Invoices } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/invoice-form" element={<InvoiceFormWrapper />} />
        <Route path="/all-drafts" element={<AllDrafts />} />
        <Route path="/all-invoices" element={<AllInvoices />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/drafts" element={<InvoiceDrafts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
