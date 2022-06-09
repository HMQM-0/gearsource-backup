import gql from "graphql-tag";

export const wishlistProductInfoFragment = `
  fragment productInfo on Product {
    id
    name
    slug
    brand
    description
    descriptionJson
    entityId: id
    isAvailable
    isAvailableForPurchase
    availableForPurchase
    category {
      id
      slug
      name
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
    price: minimalVariantPrice {
      currency
      amount
    }
    pricing {
      onSale
      priceRange {
        start {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        stop {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
      }
      priceRangeUndiscounted {
        start {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        stop {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
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
        valueRequired
        values {
          id
          name
        }
      }
      values {
        id
        name
      }
    }
    thumbnail {
      url
    }
    defaultVariant {
      id
      name
      quantityAvailable
    }
    variants {
      id
      name
      sku
      quantityAvailable
      images {
        url
      }
      pricing {
        price {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
        priceUndiscounted {
          currency
          gross {
            currency
            amount
          }
          net {
            currency
            amount
          }
          tax {
            amount
            currency
          }
        }
      }
      attributes {
        attribute {
          id
          name
          valueRequired
          values {
            id
            name
          }
        }
        values {
          id
          name
        }
      }
    }
    path: slug
  }
`;

export const wishlistItemFragment = gql`
  fragment WishlistItem on WishlistItem {
    id
    product {
      ...productInfo
      countableImages(first: 100) {
        edges {
          node {
            id
            altText: alt
            urlOriginal: url
          }
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          name
          sku
          pricing {
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
      }
    }
  }
  ${wishlistProductInfoFragment}
`;
