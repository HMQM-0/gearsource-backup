import gql from "graphql-tag";

export const brandingQuery = gql`
  query Branding {
    branding {
      id
      jsonContent
      logo {
        url
      }
      icon {
        url
      }
      favicon {
        url
      }
      footerText
      logoHeight
      logoWidth
    }
  }
`;

export const getClientSecretQuery = gql`
  query GetClientSecret(
    $gateway: ID!
    $paymentInformation: StripeClientPaymentData!
  ) {
    getClientSecret(gateway: $gateway, paymentInformation: $paymentInformation)
  }
`;
