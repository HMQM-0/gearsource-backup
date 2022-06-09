import { TypedQuery } from "@temp/core/queries";
import gql from "graphql-tag";
import { DesignerData } from "./types";

export const themeFontQuery = gql`
  query ThemeFont($name: String!) {
    designerdata(name: $name) {
      name
      jsonContent
    }
  }
`;

export const TypedThemeFontQuery = TypedQuery<DesignerData, {}>(themeFontQuery);
