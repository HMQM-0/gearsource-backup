import "./scss/index.scss";

import * as React from "react";
// import { RouteComponentProps } from "react-router";

import { Loader } from "@components/atoms";

// import { useAuth, useNauticalOrderDetails } from "@nautical/sdk";
import { useAuth, useNauticalOrderDetails } from "@nautical/react";

import Page from "./Page";
// import { NauticalOrderDetail } from "@nautical/sdk/lib/fragments/gqlTypes/OrderDetail";
import { NauticalOrderDetail } from "@nautical/fragments/gqlTypes/OrderDetail";
import { useParams } from "react-router";

// const View: React.FC<RouteComponentProps<{ token?: string }>> = ({
const View: React.FC<any> = () => {
  const params = useParams();
  const { data: order, loading } = useNauticalOrderDetails(
    { token: params.token },
    { fetchPolicy: "cache-first" }
  );
  const { user } = useAuth();
  const guest = !user;

  const handleDownloadInvoice = () => {
    if (order && "invoices" in order && order.invoices?.length > 0) {
      // Always download latest invoice
      const invoice = order.invoices
        .filter((invoice) => {
          return invoice.number.includes("INV");
        })
        .reduce((a, b) => {
          return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
        });

      if (invoice) {
        window.open(invoice.url, "_blank");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="order-details container">
      <Page
        guest={guest}
        order={order as NauticalOrderDetail}
        downloadInvoice={handleDownloadInvoice}
      />
    </div>
  );
};

export default View;
