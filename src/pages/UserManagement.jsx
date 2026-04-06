import React from "react";
import { Header, UserManagementComponent } from "../components";
import { Layout } from "../utils/theme";

export const UserManagement = () => {
  return (
    <div>
      {" "}
      <Header />
      <Layout>
       <UserManagementComponent/>
      </Layout>
    </div>
  );
};
