import gql from "graphql-tag";

// NAUTICAL MUTATION FRAGMENT
const orderErrorFragment = gql`
  fragment OrderErrorFragment on OrderError {
    code
    field
    message
  }
`;

export const fragmentNauticalOrderEvent = gql`
  fragment NauticalOrderEventFragment on NauticalOrderEvent {
    id
    amount
    date
    email
    emailType
    invoiceNumber
    message
    quantity
    type
    user {
      id
      email
    }
  }
`;

// NAUTICAL MUTATION
export const nauticalBulkFulfillmentReturnDashboardNotification = gql`
  ${fragmentNauticalOrderEvent}
  ${orderErrorFragment}
  mutation NauticalOrderReturnFromStorefrontNotification(
    $order: ID!
    $input: OrderReturnNotificationInput!
  ) {
    nauticalOrderReturnFromStorefrontNotification(
      order: $order
      input: $input
    ) {
      errors: orderErrors {
        ...OrderErrorFragment
      }
      order {
        id
        events {
          ...NauticalOrderEventFragment
        }
      }
    }
  }
`;

// VENDOR MUTATION FRAGMENT
export const fragmentOrderEvent = gql`
  fragment OrderEventFragment on OrderEvent {
    id
    amount
    date
    email
    emailType
    invoiceNumber
    message
    quantity
    type
    user {
      id
      email
    }
  }
`;

// VENDOR MUTATION
export const vendorBulkFulfillmentReturnDashboardNotification = gql`
  ${fragmentOrderEvent}
  ${orderErrorFragment}
  mutation VendorOrderReturnFromStorefrontNotification(
    $order: ID!
    $input: OrderReturnNotificationInput!
  ) {
    vendorOrderReturnFromStorefrontNotification(order: $order, input: $input) {
      errors: orderErrors {
        ...OrderErrorFragment
      }
      order {
        id
        events {
          ...OrderEventFragment
        }
      }
    }
  }
`;
