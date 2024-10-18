import { useState } from "react";
import { Header, InvoiceButtonCard, UpdatePasswordModal } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";
import { AllInvoices } from "./AllInvoices";
export const DashboardWrapper = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Header setShow={setShow} />
      <Layout>
        <Box>
          <AllInvoices />
        </Box>
        <UpdatePasswordModal show={show} setShow={setShow} />
      </Layout>
    </>
  );
};
