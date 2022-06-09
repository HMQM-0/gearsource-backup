import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import {
  BuilderProducts,
  BuilderProductsVariables,
} from "./gqlTypes/BuilderProducts";
import { Products, ProductsVariables } from "./gqlTypes/Products";

export const productVariantSummaryFragment = gql`
  fragment ProductVariantSummaryFields on ProductVariant {
    id
    name
    images {
      url
    }
    quantityAvailable
    attributes {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
        value: name
        extra: value
      }
    }
  }
`;

export const menuItem = gql`
  fragment MenuItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    collection {
      id
      name
    }
    page {
      id
      title
    }
    level
    parent {
      id
      name
    }
  }
`;

export const productsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${menuItem}
  query Products(
    $attributes: [AttributeInput!]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        isPublished: true
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        stockAvailability: IN_STOCK
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          seller {
            id
            companyName
          }
          category {
            id
            name
          }
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
            }
          }
          defaultVariant {
            id
          }
          variants {
            id
            name
            images {
              url
            }
            attributes {
              attribute {
                id
                name
                slug
              }
              values {
                id
                name
                value: name
                extra: value
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    attributes(first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    menu(name: "sidenav") {
      id
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
          }
        }
      }
    }
  }
`;

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Category(
    $id: ID!
    $attributes: [AttributeInput!]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        isPublished: true
        stockAvailability: IN_STOCK
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    attributes(filter: { inCategory: $id }, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedProductsQuery = TypedQuery<Products, ProductsVariables>(
  productsQuery
);

export const builderProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${menuItem}
  query BuilderProducts(
    $attributes: [AttributeInput!]
    $after: String
    $before: String
    $first: Int
    $last: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    productList: products(
      after: $after
      before: $before
      first: $first
      last: $last
      sortBy: $sortBy
      filter: {
        isPublished: true
        attributes: $attributes
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        stockAvailability: IN_STOCK
      }
    ) {
      totalCount
      products: edges {
        product: node {
          ...BasicProductFields
          ...ProductPricingField
          seller {
            id
            companyName
            microsite {
              id
              slug
              name
            }
            logo {
              url
            }
          }
          slug
          category {
            id
            slug
            name
          }
          attributes {
            attribute {
              id
              name
              slug
            }
            values {
              id
              name
            }
          }
          brand
          defaultVariant {
            id
            name
            quantityAvailable
          }
          variants {
            id
            name
            images {
              url
            }
            quantityAvailable
            attributes {
              attribute {
                id
                name
                slug
              }
              values {
                id
                name
                value: name
                extra: value
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    attributes(first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
    menu(name: "sidenav") {
      id
      name
      items {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
          }
        }
      }
    }
  }
`;

export const TypedBuilderProductsQuery = TypedQuery<
  BuilderProducts,
  BuilderProductsVariables
>(builderProductsQuery);
