import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  DashboardWrapper,
  Login,
  InvoiceFormWrapper,
  AllDrafts,
  AllInvoices,
} from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/invoice-form" element={<InvoiceFormWrapper />} />
        <Route path="/all-drafts" element={<AllDrafts />} />
        <Route path="/all-invoices" element={<AllInvoices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
