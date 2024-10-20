import { useState } from "react";
import { Header, InvoiceForm, UpdatePasswordModal } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";

export const InvoiceFormWrapper = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Header setShow={setShow} />
      <Layout>
        <Box>
          <Container>
            <InvoiceForm />
          </Container>
        </Box>
        <UpdatePasswordModal show={show} setShow={setShow} />
      </Layout>
    </>
  );
};
