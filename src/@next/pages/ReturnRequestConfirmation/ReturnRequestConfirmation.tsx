import React from "react";
import { Loader } from "@components/atoms";
import { useNauticalOrderDetails } from "@nautical/react";
import { ReturnLinesTable } from "@components/molecules/ReturnLinesTable";
import { useParams } from "react-router";

export const ReturnRequestConfirmation = () => {
  const params = useParams();

  // QUERIES
  const { data: order, loading } = useNauticalOrderDetails(
    { token: params.token },
    { fetchPolicy: "cache-first" }
  );

  return loading && !order ? (
    <Loader />
  ) : (
    <div className="order-details container">
      <ReturnLinesTable order={order} />
    </div>
  );
};
