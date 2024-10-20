import { useState } from "react";
import { Header, UpdatePasswordModal } from "../components";
import { Layout } from "../utils/theme";
import { Box } from "@mui/material";
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
