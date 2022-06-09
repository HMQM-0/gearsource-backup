/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Menu } from "@temp/views/Products/gqlTypes/Products";
import {
  Microsite_attributes_edges_node,
  Microsite_microsite,
} from "./Microsite";

// ====================================================
// GraphQL query operation: BuilderMicrosite
// ====================================================

export interface BuilderMicrosite_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  attribute: Microsite_attributes_edges_node;
}

export interface BuilderMicrosite_attributes {
  __typename: "AttributeCountableConnection";
  attributes: BuilderMicrosite_attributes_edges[];
}

export interface BuilderMicrosite {
  /**
   * Look up a microsite by ID.
   */
  microsite: Microsite_microsite | null;
  /**
   * List of the shop's attributes.
   */
  attributeList: BuilderMicrosite_attributes | null;
  // Sidebar Nav
  menu: Menu | null;
}

export interface BuilderMicrositeVariables {
  id?: string;
  slug?: string;
}
