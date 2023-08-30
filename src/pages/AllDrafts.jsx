import { useState } from "react";
import { Header, InvoiceDrafts } from "../components";
import { Layout } from "../utils/theme";

export const AllDrafts = () => {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <Header setShow={setShow} />
      <InvoiceDrafts />
    </Layout>
  );
};
