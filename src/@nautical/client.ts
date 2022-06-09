import { ApolloCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client";
import { ApolloLink } from "@apollo/client";

/**
 * Creates Apollo client.
 * @param cache Cache used by created Apollo client.
 * @param links Links used by created Apollo client.
 */
export function createNauticalClient(
  cache: ApolloCache<any>,
  links: ApolloLink[]
) {
  return new ApolloClient({
    cache,
    link: ApolloLink.from(links),
  });
}
