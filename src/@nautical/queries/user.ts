import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";

export const getUserDetailsQuery = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;

export const getYotpoLoyaltyAndReferralsCustomerDetails = gql`
  query GetYotpoLoyaltyAndReferralsCustomerDetails($email: String!) {
    customerLoyaltyAndReferralsDetails(email: $email) {
      firstName
      lastName
      email
      pointsBalance
      pointsEarned
    }
  }
`;
