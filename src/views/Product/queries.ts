import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import {
  BuilderProductDetails,
  BuilderProductDetailsVariables,
} from "./gqlTypes/BuilderProductDetails";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";

export const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    slug
    isAvailableForPurchase
    isAvailable
    availableForPurchase
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 540) {
      url
    }
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    quantityAvailable(countryCode: $countryCode)
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
        slug
        metadata {
          key
          value
        }
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

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!, $countryCode: CountryCode) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      description
      category {
        id
        name
        slug
        backgroundImage {
          url
          alt
        }
        products(first: 6, filter: {
          isPublished: true
          stockAvailability: IN_STOCK
        }) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              defaultVariant {
                ...ProductVariantFields
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
              thumbnail {
                url
                alt
              }
            }
          }
        }
      }
      defaultVariant {
        ...ProductVariantFields
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      features {
        name
        description
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      seller {
        id
        companyName
      }
    }
  }
`;

export const builderProductDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query BuilderProductDetails(
    $id: ID
    $slug: String
    $countryCode: CountryCode
  ) {
    product(id: $id, slug: $slug) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      description
      category {
        id
        slug
        name
        backgroundImage {
          url
          alt
        }
        productList: products(first: 6, filter: {
          isPublished: true
          stockAvailability: IN_STOCK
        }) {
          products: edges {
            product: node {
              ...BasicProductFields
              ...ProductPricingField
              defaultVariant {
                ...ProductVariantFields
              }
              slug
              category {
                id
                slug
                name
              }
              variants {
                id
                quantityAvailable
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
              thumbnail {
                url
                alt
              }
            }
          }
        }
      }
      defaultVariant {
        ...ProductVariantFields
      }
      images {
        id
        alt
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      features {
        name
        description
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
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
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!], $countryCode: CountryCode) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantFields
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const TypedProductDetailsQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedBuilderProductDetailsQuery = TypedQuery<
  BuilderProductDetails,
  BuilderProductDetailsVariables
>(builderProductDetailsQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);
