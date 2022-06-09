// import { History, LocationState } from "history";
import { History } from "history";
import { Base64 } from "js-base64";
import { each } from "lodash";
import {
  parse as parseQs,
  stringify as stringifyQs,
  ParsedQuery,
} from "query-string";
import { FetchResult } from "@apollo/client";

import { OrderDirection, ProductOrderField } from "../../gqlTypes/globalTypes";
import { IFilterAttributes } from "../@next/types";
import { FormError } from "./types";

export const slugify = (text: string | number): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number => {
  // This is temporary solution, we will use slugs in the future
  const rawId = Base64.decode(graphqlId);
  const regexp = /(\w+):(\d+)/;
  const arr = regexp.exec(rawId);
  if (schema && schema !== arr![1]) {
    throw new Error("Schema is not correct");
  }
  return parseInt(arr![2], 10);
};

export const getGraphqlIdFromDBId = (id: string, schema: string): string =>
  // This is temporary solution, we will use slugs in the future
  Base64.encode(`${schema}:${id}`);

export const priceToString = (
  price: { amount: number; currency: string },
  locale?: string
): string => {
  const { amount } = price;
  if (locale) {
    return amount.toLocaleString(locale, {
      currency: price.currency,
      style: "currency",
    });
  }
  return `${price.currency} ${amount.toFixed(2)}`;
};

export const generateProductsUrl = () => `/products/`;

export const generateProductUrl = (product) => {
  const rawId = Base64.decode(product?.id).split(":");
  const primaryKey = rawId[1];
  const slug = product.slug;
  return "/product/" + slug + "/" + primaryKey + "/"
}

export const generateCategoryUrl = (id: string, name: string) =>
  `/category/${slugify(name)}/${getDBIdFromGraphqlId(id, "Category")}/`;

export const generateCollectionUrl = (id: string, name: string) =>
  `/collection/${slugify(name)}/${getDBIdFromGraphqlId(id, "Collection")}/`;

export const generateMicrositeUrl = (id: string, name: string) =>
  `/site/${slugify(name)}/${getDBIdFromGraphqlId(id, "Microsite")}/`;

export const generateDBMicrositeUrl = (id: string, name: string) =>
  `/site/${slugify(name)}/${id}/`;

export const generateMicrositeProductUrl = (
  id: string,
  name: string,
  micrositeId: string,
  micrositeName: string
) =>
  `/site/${slugify(micrositeName)}/${getDBIdFromGraphqlId(
    micrositeId,
    "Microsite"
  )}/product/${slugify(name)}/${getDBIdFromGraphqlId(id, "Product")}/`;

export function isMicrosite() {
  return window.location.pathname.match(/\/site\/[^/]+\/[0-9]+/g);
}

export function getMicrositeId() {
  return getGraphqlIdFromDBId(
    /\/site\/[^/]+\/([0-9]+)/
      .exec(window.location.href)[1]
      .trim()
      .replace(/\//g, ""),
    "Microsite"
  );
}

export function getMicrositeSlug() {
  return /\/site\/([^/]+)\/[0-9]+/.exec(window.location.href)[1];
}

export const generatePageUrl = (slug: string) => `/page/${slug}/`;

interface AttributeDict {
  [attributeSlug: string]: string[];
}
export const convertToAttributeScalar = (
  attributes: AttributeDict | IFilterAttributes
) =>
  Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute: any) => ({ slug: key, value: attribute }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);

interface QueryString {
  [key: string]: string[] | string | null | undefined;
}
export const getAttributesFromQs = (qs: QueryString) =>
  Object.keys(qs)
    .filter(
      (key) =>
        !["pageSize", "priceGte", "priceLte", "sortBy", "q"].includes(key)
    )
    .reduce((prev: any, curr: any) => {
      prev[curr] = typeof qs[curr] === "string" ? [qs[curr]] : qs[curr];
      return prev;
    }, {});

export const getValueOrEmpty = <T>(value: T): T | string =>
  value === undefined || value === null ? "" : value;

export const convertSortByFromString = (sortBy: string) => {
  if (!sortBy) {
    return null;
  }
  const direction = sortBy.startsWith("-")
    ? OrderDirection.DESC
    : OrderDirection.ASC;

  let field;
  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = ProductOrderField.NAME;
      break;

    case "price":
      field = ProductOrderField.MINIMAL_PRICE;
      break;

    case "updated_at":
      field = ProductOrderField.DATE;
      break;

    case "created_at":
      field = ProductOrderField.CREATED;
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const maybe = <T>(exp: () => T, d?: T) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const parseQueryString = (
  // location: LocationState
  location: any
): ParsedQuery<string> => {
  let query: ParsedQuery<string> = parseQs(window.location.search.substr(1));

  each(query, (value, key) => {
    if (Array.isArray(value)) {
      query = {
        ...query,
        [key]: value[0],
      };
    }
  });
  return query;
};

export const updateQueryString = (
  // location: LocationState,
  location: any,
  history: History
) => {
  const querystring = parseQueryString(location);

  return (key: string, value?: any) => {
    if (value === "") {
      delete querystring[key];
    } else {
      querystring[key] = value || key;
    }
    history.replace(`?${stringifyQs(querystring)}`);
  };
};

export const findFormErrors = (result: void | FetchResult): FormError[] => {
  if (result) {
    const data = Object.values(maybe(() => result.data) as object);

    return data.reduce((prevVal: any, currVal: any) => {
      const errors = currVal.errors || [];

      return [...prevVal, ...errors];
    }, []);
  }
  return [];
};

export const removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");
