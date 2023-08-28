import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardWrapper, Login, InvoiceFormWrapper } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/invoice-form" element={<InvoiceFormWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
