import gql from "graphql-tag";

import { orderDetailFragment } from "../fragments/order";
import { invoiceFragment } from "../fragments/invoice";
import { nauticalOrderDetailFragment } from "../fragments/order";

export const ordersByUser = gql`
  query OrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      orders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            token
            number
            statusDisplay
            created
            total {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            lines {
              id
              variant {
                id
                product {
                  name
                  id
                }
              }
              thumbnail {
                alt
                url
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const orderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  query OrderByToken($token: NauticalUUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
    }
  }
`;

export const userOrderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  ${invoiceFragment}
  query UserOrderByToken($token: NauticalUUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
      invoices {
        ...InvoiceFragment
      }
    }
  }
`;

export const nauticalOrdersByUser = gql`
  query NauticalOrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      nauticalOrders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            token
            number
            statusDisplay
            created
            total {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            sellerFulfillments {
              id
              status
              lines {
                id
                quantity
                orderLine {
                  id
                  productName
                  productSku
                  variantName
                  quantity
                  quantityFulfilled
                }
              }
            }
            lines {
              id
              productName
              productSku
              quantity
              variant {
                id
                product {
                  name
                  id
                }
              }
              thumbnail {
                alt
                url
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const nauticalOrderDetailsByTokenQuery = gql`
  ${nauticalOrderDetailFragment}
  query NauticalOrderByToken($token: NauticalUUID!) {
    nauticalOrderByToken(token: $token) {
      ...NauticalOrderDetail
    }
  }
`;

export const userNauticalOrderDetailsByTokenQuery = gql`
  ${nauticalOrderDetailFragment}
  ${invoiceFragment}
  query UserNauticalOrderByToken($token: NauticalUUID!) {
    nauticalOrderByToken(token: $token) {
      ...NauticalOrderDetail
      invoices {
        ...InvoiceFragment
      }
    }
  }
`;
