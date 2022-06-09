/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Menu } from "@temp/views/Products/gqlTypes/Products";

// ====================================================
// GraphQL query operation: Microsite
// ====================================================

export interface Microsite_microsite_image {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Microsite_microsite {
  __typename: "Microsite";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  footerText: string | null;
  seoDescription: string | null;
  seoTitle: string | null;
  bannerImage: Microsite_microsite_image | null;
  logoImage: Microsite_microsite_image | null;
}

export interface Microsite_attributes_edges_node_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Microsite_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of attribute's values.
   */
  values: (Microsite_attributes_edges_node_values | null)[] | null;
}

export interface Microsite_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Microsite_attributes_edges_node;
}

export interface Microsite_attributes {
  __typename: "AttributeCountableConnection";
  edges: Microsite_attributes_edges[];
}

export interface Microsite {
  /**
   * Look up a microsite by ID.
   */
  microsite: Microsite_microsite | null;
  /**
   * List of the shop's attributes.
   */
  attributes: Microsite_attributes | null;
  // Sidebar Nav
  menu: Menu | null;
}

export interface MicrositeVariables {
  id?: string;
  slug?: string;
}
