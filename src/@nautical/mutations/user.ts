import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";
import { accountErrorFragment } from "../fragments/errors";

export const changeUserPassword = gql`
  ${accountErrorFragment}
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;

export const setPassword = gql`
  ${userFragment}
  ${accountErrorFragment}
  mutation SetPassword($token: String!, $email: String!, $password: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      errors: accountErrors {
        ...AccountError
      }
      token
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord = gql`
  mutation YotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecords(
    $user: UserInput!
  ) {
    yotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord(user: $user) {
      ok
      status
    }
  }
`;

export const yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints = gql`
  mutation YotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints(
    $input: UserPointsInput!
  ) {
    yotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints(input: $input) {
      ok
      status
    }
  }
`;
