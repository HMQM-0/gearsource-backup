import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  priceFragment,
  productPricingFragment,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";
import {
  CollectionProducts,
  CollectionProductsVariables,
} from "./gqlTypes/CollectionProducts";
import { menuItem } from "../Products/queries";
import {
  BuilderCollection,
  BuilderCollectionVariables,
} from "./gqlTypes/BuilderCollection";
import {
  BuilderCollectionProducts,
  BuilderCollectionProductsVariables,
} from "./gqlTypes/BuilderCollectionProducts";

export const collectionProductsDataQuery = gql`
  ${menuItem}
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      slug
      name
      seoDescription
      seoTitle
      backgroundImage {
        url
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
    attributes(
      filter: { inCollection: $id, filterableInStorefront: true }
      first: 100
    ) {
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

export const TypedCollectionProductsDataQuery = TypedQuery<
  Collection,
  CollectionVariables
>(collectionProductsDataQuery);

export const collectionProductsQuery = gql`
  ${priceFragment}
  ${basicProductFragment}
  ${productPricingFragment}
  query CollectionProducts(
    $id: ID!
    $attributes: [AttributeInput!]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    collection(id: $id) {
      id
      backgroundImage {
        url
      }
      products(
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
        edges {
          node {
            ...BasicProductFields
            ...ProductPricingField
            category {
              id
              name
            }
            seller {
              id
              companyName
            }
            defaultVariant {
              id
              name
              pricing {
                onSale
                priceUndiscounted {
                  ...Price
                }
                price {
                  ...Price
                }
              }
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
    }
  }
`;

export const TypedCollectionProductsQuery = TypedQuery<
  CollectionProducts,
  CollectionProductsVariables
>(collectionProductsQuery);

export const builderCollectionQuery = gql`
  ${priceFragment}
  ${basicProductFragment}
  ${productPricingFragment}
  query BuilderCollection(
    $id: ID!
    $attributes: [AttributeInput!]
    $after: String
    $first: Int
    $before: String
    $last: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    collection(id: $id) {
      id
      slug
      name
      seoDescription
      seoTitle
      description
      descriptionJson
      backgroundImage {
        url
      }
      productList: products(
        after: $after
        first: $first
        before: $before
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
            category {
              id
              slug
              name
            }
            slug
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
            brand
            defaultVariant {
              id
              name
              quantityAvailable
              pricing {
                onSale
                priceUndiscounted {
                  ...Price
                }
                price {
                  ...Price
                }
              }
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
    }
  }
`;

export const builderCollectionInfoQuery = gql`
  ${menuItem}
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      slug
      name
      seoDescription
      seoTitle
      description
      descriptionJson
      backgroundImage {
        url
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
    attributeList: attributes(
      filter: { inCollection: $id, filterableInStorefront: true }
      first: 100
    ) {
      attributes: edges {
        attribute: node {
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

export const TypedBuilderCollectionProductsDataQuery = TypedQuery<
  BuilderCollection,
  BuilderCollectionVariables
>(builderCollectionInfoQuery);

export const TypedBuilderCollectionProductsQuery = TypedQuery<
  BuilderCollectionProducts,
  BuilderCollectionProductsVariables
>(builderCollectionQuery);
