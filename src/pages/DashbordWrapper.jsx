import { Header, InvoiceButtonCard } from "../components";
import { Layout } from "../utils/theme";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const DashboardWrapper = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Box>
        <Container maxWidth="lg">
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "start",
              display: "flex",
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
              actions={() => navigate("/invoice-form")}
            />
            <InvoiceButtonCard
              text={"Draft Invoice"}
              color={"black"}
              actions={null}
            />
            <InvoiceButtonCard
              text={" Invoice"}
              color={"black"}
              actions={null}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};
