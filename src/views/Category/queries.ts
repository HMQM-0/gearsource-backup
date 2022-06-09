import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";
import { menuItem } from "../Products/queries";
import {
  CategoryProducts,
  CategoryProductsVariables,
} from "./gqlTypes/CategoryProducts";
import {
  BuilderCategory,
  BuilderCategoryVariables,
} from "./gqlTypes/CategoryBuilder";
import {
  CategoryBuilderProducts,
  CategoryBuilderProductsVariables,
} from "./gqlTypes/CategoryBuilderProducts";

export const categoryProductsDataQuery = gql`
  ${menuItem}
  query Category($id: ID!) {
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
    attributes(
      filter: { inCategory: $id, filterableInStorefront: true }
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

export const TypedCategoryProductsDataQuery = TypedQuery<
  Category,
  CategoryVariables
>(categoryProductsDataQuery);

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${menuItem}
  query CategoryProducts(
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
              price {
                gross {
                  amount
                  currency
                }
                net {
                  amount
                  currency
                }
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

export const TypedCategoryProductsQuery = TypedQuery<
  CategoryProducts,
  CategoryProductsVariables
>(categoryProductsQuery);

export const builderCategoryQuery = gql`
  ${menuItem}
  query BuilderCategoryData($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      description
      descriptionJson
      id
      name
      slug
      backgroundImage {
        url
      }
      ancestorList: ancestors(last: 5) {
        categories: edges {
          category: node {
            id
            name
          }
        }
      }
    }
    attributeList: attributes(
      filter: { inCategory: $id, filterableInStorefront: true }
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

export const TypedBuilderCategoryQuery = TypedQuery<
  BuilderCategory,
  BuilderCategoryVariables
>(builderCategoryQuery);

export const builderCategoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query BuilderCategoryProductsData(
    $id: ID!
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
      first: $first
      before: $before
      last: $last
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
              price {
                gross {
                  amount
                  currency
                }
                net {
                  amount
                  currency
                }
              }
            }
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
`;

export const TypedBuilderCategoryProductsQuery = TypedQuery<
  CategoryBuilderProducts,
  CategoryBuilderProductsVariables
>(builderCategoryProductsQuery);

// export const builderCategoryQuery = gql`
//   ${basicProductFragment}
//   ${productPricingFragment}
//   ${menuItem}
//   query BuilderCategory(
//     $id: ID!
//     $attributes: [AttributeInput!]
//     $after: String
//     $pageSize: Int
//     $sortBy: ProductOrder
//     $priceLte: Float
//     $priceGte: Float
//   ) {
//     productList: products(
//       after: $after
//       first: $pageSize
//       sortBy: $sortBy
//       filter: {
//         attributes: $attributes
//         categories: [$id]
//         minimalPrice: { gte: $priceGte, lte: $priceLte }
//       }
//     ) {
//       totalCount
//       products: edges {
//         product: node {
//           ...BasicProductFields
//           ...ProductPricingField
//           category {
//             id
//             name
//           }
//           slug
//           seller {
//             id
//             companyName
//           }
//           brand
//           defaultVariant {
//             id
//             name
//             pricing {
//               onSale
//               price {
//                 gross {
//                   amount
//                   currency
//                 }
//                 net {
//                   amount
//                   currency
//                 }
//               }
//             }
//           }
//           variants {
//             id
//             name
//             images {
//               url
//             }
//             attributes {
//               attribute {
//                 id
//                 name
//                 slug
//               }
//               values {
//                 id
//                 name
//                 value: name
//                 extra: value
//               }
//             }
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//     }
//     menu(name: "sidenav") {
//       id
//       name
//       items {
//         ...MenuItem
//         children {
//           ...MenuItem
//           children {
//             ...MenuItem
//           }
//         }
//       }
//     }
//   }
// `;
