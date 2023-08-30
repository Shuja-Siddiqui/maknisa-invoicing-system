import { useState } from "react";
import { Header, InvoiceForm, UpdatePasswordModal } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export const InvoiceFormWrapper = () => {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <Box>
        <Header setShow={setShow} />
        <Container>
          <InvoiceForm />
        </Container>
      </Box>
      <UpdatePasswordModal show={show} setShow={setShow} />
    </Layout>
  );
};
