import gql from "graphql-tag";

import { affiliateErrorFragment } from "../fragments/errors";

export const useAffiliateCodeMutation = gql`
  ${affiliateErrorFragment}
  mutation AffiliateCodeUse($code: String!) {
    affiliateCodeUse(code: $code) {
      affiliateCodes {
        id
        uses
        affiliate {
          id
          email
          firstName
          lastName
        }
        code
        channel {
          id
          channel
        }
      }
      errors: affiliateErrors {
        ...AffiliateError
      }
    }
  }
`;
