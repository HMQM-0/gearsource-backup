import { queryFactory, queryWithVariablesFactory } from "./useQuery";

export const useProductDetails = queryWithVariablesFactory("getProductDetails");
export const useProductList = queryWithVariablesFactory("getProductList");

export const useShopDetails = queryFactory("getShopDetails");

export const useOrderDetails = queryWithVariablesFactory("getOrderDetails");
export const useNauticalOrderDetails = queryWithVariablesFactory(
  "getNauticalOrderDetails"
);
export const useOrdersByUser = queryWithVariablesFactory("getOrdersByUser");
export const useNauticalOrdersByUser = queryWithVariablesFactory(
  "getNauticalOrdersByUser"
);

export const useCategoryDetails =
  queryWithVariablesFactory("getCategoryDetails");

export const useAtrributes = queryWithVariablesFactory("getAttributes");

export const useVariantsProducts = queryWithVariablesFactory(
  "getVariantsProducts"
);

export const useUserWishlist = queryWithVariablesFactory("getUserWishlist");

// Yotpo Ratings & Reveiews queries
export const useProductRatingsAndReviews = queryWithVariablesFactory(
  "getProductRatingsAndReviews"
);

// Yotpo Loyalty & Referrals queries
export const useYotpoLoyaltyAndReferralsFetchCustomerDetails =
  queryWithVariablesFactory("getYotpoLoyaltyAndReferralsCustomerDetails");
export const useFetchLoyaltyAndReferralsInfo = queryFactory(
  "getLoyaltyAndReferralsInfo"
);

// ShippyPro queries
export const useGetShippyProApiKeyForScript = queryFactory(
  "getShippyProApiKeyForScript"
);
