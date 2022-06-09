import gql from "graphql-tag";

import { TypedQuery } from "../../../../core/queries";
import { Seller, SellerVariables } from "./gqlTypes/MultiSellerCheckout";

const sellerQuery = gql`
  query Seller($id: ID!) {
    sellerName(id: $id) {
      id
      companyName
    }
  }
`;

export const TypedSellerNameQuery = TypedQuery<Seller, SellerVariables>(
  sellerQuery
);
