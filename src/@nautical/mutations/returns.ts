import gql from "graphql-tag";

const orderErrorFragment = gql`
  fragment OrderErrorFragment on OrderError {
    code
    field
    message
  }
`;

const fragmentOrderLine = gql`
  fragment OrderLineFragment on OrderLine {
    id
    isShippingRequired
    variant {
      id
      product {
        id
        isAvailableForPurchase
        isPublished
        originLocation {
          id
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            code
            country
          }
          phone
        }
        destinationLocation {
          id
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            code
            country
          }
          phone
        }
        variants {
          id
          name
        }
      }
      quantityAvailable
    }
    productName
    variantName
    productSku
    quantity
    quantityFulfilled
    unitPrice {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    thumbnail {
      url
    }
  }
`;

const fulfillmentFragment = gql`
  ${fragmentOrderLine}
  fragment FulfillmentFragment on Fulfillment {
    id
    lines {
      id
      quantity
      orderLine {
        ...OrderLineFragment
      }
      returnReason
    }
    fulfillmentOrder
    relatedTo {
      id
    }
    status
    order {
      id
      seller {
        id
        companyName
      }
    }
    trackingNumber
    trackingUrl
    warehouse {
      id
      name
    }
  }
`;

export const bulkFulfillmentReturn = gql`
  ${orderErrorFragment}
  ${fulfillmentFragment}
  mutation BulkFulfillmentReturn($input: [BulkFulfillmentReturnInput!]) {
    bulkFulfillmentReturn(input: $input) {
      errors: orderErrors {
        ...OrderErrorFragment
      }
      fulfillments {
        ...FulfillmentFragment
      }
    }
  }
`;
