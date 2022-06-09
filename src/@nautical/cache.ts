import {
  InMemoryCache,
  defaultDataIdFromObject,
  NormalizedCacheObject,
} from "@apollo/client/cache";
import {
  persistCache as apolloPersistCache,
  PersistentStorage,
} from "apollo3-cache-persist";
import { PersistedData } from "apollo3-cache-persist/lib/types";

interface NauticalCacheConfig {
  /**
   * Determines if the cache has to be persisted in local storage. False by default.
   */
  persistCache?: boolean;
}

/**
 * Creates cache for Apollo client.
 * @param cacheConfig Configuration for created cache.
 */
export const createNauticalCache = async ({
  persistCache = false,
}: NauticalCacheConfig) => {
  const nauticalCache = new InMemoryCache({
    dataIdFromObject: (obj) => {
      // eslint-disable-next-line no-underscore-dangle
      if (obj.__typename === "Shop") {
        return "shop";
      }
      return defaultDataIdFromObject(obj);
    },
  });

  if (persistCache) {
    await apolloPersistCache({
      cache: nauticalCache,
      // @ts-ignore
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    });
  }

  return nauticalCache;
};
