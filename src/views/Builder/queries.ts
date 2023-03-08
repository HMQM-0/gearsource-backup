import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import {
  Products,
  ProductsVariables,
} from "@temp/views/Products/gqlTypes/Products";

export const productVariantSummaryFragment = gql`
  fragment ProductVariantSummaryFields on ProductVariant {
    id
    name
    isAvailable
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
    productList: products(
      after: $after
      first: $pageSize
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
          brand
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
        isPublished: true
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
        stockAvailability: IN_STOCK
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          category {
            id
            slug
            name
            
          }
          attributes{
            id
            slug
            name
            values{
              name
            }
          }
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
      slug
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

export const QUERY_BUILDER_PRODUCTS = productsQuery;

export const micrositesQuery = gql`
  query Microsites($first: Int, $search: String) {
    microsites(
      first: $first
      filter: { published: PUBLISHED, search: $search }
    ) {
      edges {
        node {
          seoTitle
          seoDescription
          description
          descriptionJson
          id
          name
          slug
          description
          affiliate {
            id
            firstName
            lastName
            companyName
            email
          }
          seller {
            id
            companyName
            logo {
              url
            }
          }
          logoImage {
            url
          }
          bannerImage {
            url
          }
        }
      }
    }
  }
`;
