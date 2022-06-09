/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Menu } from "@temp/views/Products/gqlTypes/Products";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface BuilderCategory_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface BuilderCategory_category_ancestors_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface BuilderCategory_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  category: BuilderCategory_category_ancestors_edges_node;
}

export interface BuilderCategory_category_ancestors {
  __typename: "CategoryCountableConnection";
  categories: BuilderCategory_category_ancestors_edges[];
}

export interface BuilderCategory_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: BuilderCategory_category_backgroundImage | null;
  /**
   * List of ancestors of the category.
   */
  ancestorList: BuilderCategory_category_ancestors | null;
}

export interface BuilderCategory_attributes_edges_node_values {
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

export interface BuilderCategory_attributes_edges_node {
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
  values: (BuilderCategory_attributes_edges_node_values | null)[] | null;
}

export interface BuilderCategory_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  attribute: BuilderCategory_attributes_edges_node;
}

export interface BuilderCategory_attributes {
  __typename: "AttributeCountableConnection";
  attributes: BuilderCategory_attributes_edges[];
}

export interface BuilderCategory {
  /**
   * Look up a category by ID or slug.
   */
  category: BuilderCategory_category | null;
  /**
   * List of the shop's attributes.
   */
  attributeList: BuilderCategory_attributes | null;
  // Sidebar Menu
  menu: Menu | null;
}

export interface BuilderCategoryVariables {
  id: string;
}
