/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Menu } from "@temp/views/Products/gqlTypes/Products";
import {
  Collection_attributes_edges_node,
  Collection_collection,
} from "./Collection";

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface BuilderCollection_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  attribute: Collection_attributes_edges_node;
}

export interface BuilderCollection_attributes {
  __typename: "AttributeCountableConnection";
  attributes: BuilderCollection_attributes_edges[];
}

export interface BuilderCollection {
  /**
   * Look up a collection by ID.
   */
  collection: Collection_collection | null;
  /**
   * List of the shop's attributes.
   */
  attributeList: BuilderCollection_attributes | null;
  // Sidebar Nav
  menu: Menu | null;
}

export interface BuilderCollectionVariables {
  id: string;
}
