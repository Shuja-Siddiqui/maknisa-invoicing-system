import { Header, InvoiceForm } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";

export const InvoiceFormWrapper = () => {
  return (
    <Layout>
      <Box>
        <Header />
        <Container>
          <InvoiceForm />
        </Container>
      </Box>
    </Layout>
  );
};
