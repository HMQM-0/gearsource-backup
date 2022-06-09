import { IAddressWithAddressType } from "@types";

// import { GetShop_shop_countries } from "@nautical/sdk/lib/queries/gqlTypes/GetShop";
import { GetShop_shop_countries } from "@nautical/queries/gqlTypes/GetShop";
import { Address } from "./types";

const formAddress: IAddressWithAddressType = {
  city: "Wroclaw",
  companyName: "Nautical Commerce, Inc.",
  country: {
    code: "PL",
    country: "Poland",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  countryArea: "dolnyslask",
  firstName: "John",
  id: "12345",
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  lastName: "Doe",
  phone: "555-5555",
  postalCode: "55-555",
  streetAddress1: "St Street",
  streetAddress2: "Second",
};

const userAddress: Address = {
  address: {
    city: "Wroclaw",
    companyName: "Nautical Commerce, Inc.",
    country: {
      code: "PL",
      country: "Poland",
      requiredFields: ["postal_code", "city", "street_address"],
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  id: "12345",
};

const countries: GetShop_shop_countries[] = [
  {
    __typename: "CountryDisplay",
    code: "PL",
    country: "Poland",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "PT",
    country: "Portugal",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "US",
    country: "United States of America",
    requiredFields: ["postal_code", "country_area", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "DE",
    country: "Germany",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "BE",
    country: "Belarus",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "SE",
    country: "Sweden",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "FR",
    country: "France",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "CZ",
    country: "Czech Republic",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "FI",
    country: "Finland",
    requiredFields: ["postal_code", "city", "street_address"],
  },
  {
    __typename: "CountryDisplay",
    code: "GB",
    country: "Great Britain",
    requiredFields: ["postal_code", "city", "street_address"],
  },
];

export const LOGGED_IN_USER_PROPS = {
  billingAsShippingPossible: true,
  countries,
  userAddresses: [
    {
      ...userAddress,
    },
  ],
};

export const ANONYMOUS_USER_PROPS = {
  billingAsShippingPossible: true,
  checkoutShippingAddress: formAddress,
  checkoutBillingAddress: formAddress,
  countries,
};
