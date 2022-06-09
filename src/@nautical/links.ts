import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { RetryLink } from "@apollo/client/link/retry";

import { authLink, invalidTokenLinkWithTokenHandler } from "./auth";

interface NauticalLinksConfig {
  /**
   * Url of the Nautical GraphQL API.
   */
  apiUrl: string;
  /**
   * Callback called when token expiration error occured in Nautical API response.
   */
  tokenExpirationCallback: () => void;
}

/**
 * Creates list of links for Apollo client.
 * @param linksConfig Configuration for created links.
 */
export const createNauticalLinks = ({
  apiUrl,
  tokenExpirationCallback,
}: NauticalLinksConfig) => {
  const invalidTokenLink = invalidTokenLinkWithTokenHandler(
    tokenExpirationCallback
  );

  return [
    invalidTokenLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({ credentials: "include", uri: apiUrl }),
  ];
};
