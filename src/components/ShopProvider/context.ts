// import { GetShop_shop } from "@nautical/sdk/lib/queries/gqlTypes/GetShop";
import { GetShop_shop } from "@nautical/queries/gqlTypes/GetShop";
import { createContext } from "react";

export const defaultCountry = {
  __typename: "CountryDisplay" as "CountryDisplay",
  code: "US",
  country: "United States of America",
};

export const defaultContext: GetShop_shop = {
  __typename: "Shop",
  countries: [],
  builderKey: null,
  crispWebsiteId: null,
  gaMeasurementId: null,
  defaultCountry,
  displayGrossPrices: true,
  loginForPrice: false,
  loginForProducts: false,
  geolocalization: { __typename: "Geolocalization", country: defaultCountry },
  activePlugins: [],
};

export const ShopContext = createContext<GetShop_shop>(defaultContext);

ShopContext.displayName = "ShopContext";
