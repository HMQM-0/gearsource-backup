import gql from "graphql-tag";

export const getShop = gql`
  query GetShop {
    shop {
      displayGrossPrices
      loginForPrice
      loginForProducts
      builderKey
      activePlugins {
        identifier
        name
        description
        active
      }
      crispWebsiteId
      gaMeasurementId
      defaultCountry {
        code
        country
      }
      countries {
        country
        code
        requiredFields
      }
      geolocalization {
        country {
          code
          country
        }
      }
    }
  }
`;
