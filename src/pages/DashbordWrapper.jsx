import { Header, InvoiceButtonCard } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";
export const DashboardWrapper = () => {
  return (
    <Layout>
      <Header />
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
              color={"black"}
              path={"/invoice-form"}
              action={"newForm"}
            />
            <InvoiceButtonCard
              text={"Draft Invoice"}
              color={"black"}
              path={"/all-drafts"}
              action={"draftForm"}
            />
            <InvoiceButtonCard
              text={" Invoice"}
              color={"black"}
              path={"/all-invoices"}
              action={"invoices"}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
