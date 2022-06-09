import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { DesignerData } from "./types";

export const promoBannerQuery = gql`
  query PromoBanner($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;

export const TypedPromoBannerQuery = TypedQuery<DesignerData, {}>(
  promoBannerQuery
);
