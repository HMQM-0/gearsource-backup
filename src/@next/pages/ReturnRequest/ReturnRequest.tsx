import { useNauticalOrderDetails } from "@nautical/react";
import React from "react";
import { Loader } from "@components/atoms";
import { OrderLinesTable } from "@components/molecules/OrderLinesTable";
import { useParams } from "react-router";
import { NotFound } from "@temp/components";

export const ReturnRequest = () => {
  const params = useParams();

  // QUERIES
  const { data: order, loading } = useNauticalOrderDetails(
    { token: params.token },
    { fetchPolicy: "cache-first" }
  );

  if (loading && !order) {
    return <Loader />;
  }

  if (!order) {
    return <NotFound />;
  }

  return (
    <div className="order-details container">
      {/* TODO: just ignoring type check since this is a temporary code */}
      {/* @ts-ignore */}
      <OrderLinesTable order={order} />
    </div>
  );
};
