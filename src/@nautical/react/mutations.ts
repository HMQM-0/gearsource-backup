import { mutationFactory } from "./useMutation";

// Address mutations
export const useDefaultUserAddress = mutationFactory("setUserDefaultAddress");
export const useDeleteUserAddresss = mutationFactory("setDeleteUserAddress");
export const useCreateUserAddress = mutationFactory("setCreateUserAddress");
export const useUpdateUserAddress = mutationFactory("setUpdateuserAddress");

// User mutations
export const usePasswordChange = mutationFactory("setPasswordChange");
export const useAccountUpdate = mutationFactory("setAccountUpdate");
export const useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord =
  mutationFactory("setYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord");
export const useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints =
  mutationFactory("setYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints");

// Affiliate mutations
export const useAffiliateCode = mutationFactory("setAffiliateCodeUse");
export const useSetPassword = mutationFactory("setPassword");

// Wishlist mutation
export const useAddWishlistProduct = mutationFactory("setAddWishlistProduct");
export const useRemoveWishlistProduct = mutationFactory(
  "setRemoveWishlistProduct"
);
export const useAddWishlistProductVariant = mutationFactory(
  "setAddWishlistProductVariant"
);
export const useAddRemoveWishlistProductVariant = mutationFactory(
  "setRemoveWishlistProductVariant"
);

// Fulfillment mutations
export const useBulkFulfillmentReturn = mutationFactory(
  "setBulkFulfillmentReturn"
);
export const useNauticalBulkFulfillmentReturnDashboardNotification =
  mutationFactory("setNauticalBulkFulfillmentReturnDashboardNotification");
export const useVendorBulkFulfillmentReturnDashboardNotification =
  mutationFactory("setVendorBulkFulfillmentReturnDashboardNotification");
