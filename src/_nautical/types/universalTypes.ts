/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// Nautical Category Universal Types
// ====================================================

export interface Image {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface Money {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface TaxedMoney {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Money;
  /**
   * Amount of money without taxes.
   */
  net: Money;
}

export interface TaxedMoneyRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: TaxedMoney | null;
  /**
   * Upper bound of a price range.
   */
  stop: TaxedMoney | null;
}

export interface Product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Image | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Image | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductPricingInfo | null;
  category: Category | null;
  attributes: (SelectedAttribute | null)[];
}

export interface ProductPricingInfo {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: TaxedMoneyRange | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: TaxedMoneyRange | null;
}

export interface SelectedAttribute {
  __typename: "SelectedAttribute";
  /**
   * The ID of the object.
   */
  attribute: Attribute;
  values: (AttributeValue | null)[];
}

export interface Attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface Category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: Image | null;
  /**
   * List of ancestors of the category.
   */
  ancestors: CategoryCountableConnection | null;
}

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Products_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: TaxedMoney | null;
  /**
   * Upper bound of a price range.
   */
  stop: TaxedMoney | null;
}

export interface Products_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: TaxedMoneyRange | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: TaxedMoneyRange | null;
}

export interface ProductCountableEdge {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Product;
}

export interface PageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ProductCountableConnection {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductCountableEdge[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PageInfo;
}

export interface CategoryCountableEdge {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Category;
}

export interface CategoryCountableConnection {
  __typename: "CategoryCountableConnection";
  edges: CategoryCountableEdge[];
}

export interface AttributeValue {
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

export interface Attribute {
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
  values: (AttributeValue | null)[] | null;
}

export interface AttributeCountableEdge {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Attribute;
}

export interface AttributeCountableConnection {
  __typename: "AttributeCountableConnection";
  edges: AttributeCountableEdge[];
}

export interface Page {
  __typename: "Page";
  id: string;
  name: string;
}

export interface Collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface MenuItem {
  __typename: "MenuItem";
  id: string;
  level: number;
  name: string;
  children: MenuItem[] | null;
  parent: MenuItem | null;
  category: Category | null;
  collection: Collection | null;
  page: Page | null;
}

export interface Menu {
  __typename: "Menu";
  id: string;
  name: string;
  items: MenuItem[] | null;
}

export interface Products {
  /**
   * List of the shop's products.
   */
  products: ProductCountableConnection | null;
  /**
   * List of the shop's attributes.
   */
  attributes: AttributeCountableConnection | null;
  // Side Nav Menu
  menu: Menu | null;
}
