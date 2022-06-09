import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import {
  ResetPasswordRequest,
  ResetPasswordRequestVariables,
} from "./gqlTypes/ResetPasswordRequest";

// Missing route and page for resetting password
const passwordResetRequestMutation = gql`
  mutation ResetPasswordRequest($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedPasswordResetRequestMutation = TypedMutation<
  ResetPasswordRequest,
  ResetPasswordRequestVariables
>(passwordResetRequestMutation);
