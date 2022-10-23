import React from "react";
import Layout from "../components/common/Layout";
import { Backend } from "@use-vote/next";
// import "@use-vote/next/dist/build.css";

const Analytics = () => {
  return (
    <Layout>
      <Backend />
    </Layout>
  );
};

export default Analytics;
