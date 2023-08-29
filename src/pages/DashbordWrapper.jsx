import { useState } from "react";
import { Header, InvoiceButtonCard, UpdatePasswordModal } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";
export const DashboardWrapper = () => {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <Header setShow={setShow} />
      <Box>
        <Container maxWidth="lg">
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              height: "500px",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
              gap: "10px",
            }}
          >
            <InvoiceButtonCard
              text={"New Invoice"}
              color={"white"}
              path={"/invoice-form"}
              action={"newForm"}
            />
            <InvoiceButtonCard
              text={"Draft Invoice"}
              color={"white"}
              path={"/drafts"}
              action={"draftForm"}
            />
            <InvoiceButtonCard
              text={" Invoice"}
              color={"white"}
              path={"/invoices"}
              action={"invoices"}
            />
          </Box>
        </Container>
      </Box>
      <UpdatePasswordModal show={show} setShow={setShow} />
    </Layout>
  );
};
