import "./app.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Login,
  InvoiceFormWrapper,
  AllDrafts,
  AllInvoices,
  DashboardWrapper,
} from "./pages";
import { InvoiceDrafts, InvoicePage, Invoices } from "./components";
import { UpdatePassword } from "./components/updatePassword";
import { useEffect } from "react";
import { verify } from "./api";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const fn = async () => {
      const res = await verify();
      if (!res) {
        navigate("/login");
      }
    };
    fn();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardWrapper />} />
      <Route path="/dashboard" element={<DashboardWrapper />} />
      <Route path="/invoice-form" element={<InvoiceFormWrapper />} />
      <Route path="/all-drafts" element={<AllDrafts />} />
      <Route path="/all-invoices" element={<AllInvoices />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/drafts" element={<InvoiceDrafts />} />
      <Route path="/print-invoice" element={<InvoicePage />} />
      <Route path="/update-password" element={<UpdatePassword />} />
    </Routes>
  );
}

export default App;
