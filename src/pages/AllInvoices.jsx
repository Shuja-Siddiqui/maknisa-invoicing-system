import { useState } from "react";
import { Header, Invoices } from "../components";
import { Layout } from "../utils/theme";

export const AllInvoices = () => {
  const [show, setShow] = useState(false);
  return(
  <Layout>
    <Header setShow={setShow} />
    <Invoices />
  </Layout>
  );
};
