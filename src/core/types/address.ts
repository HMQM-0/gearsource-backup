// import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from "@nautical/sdk/lib/mutations/gqlTypes/CreateCheckout";
import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from "@nautical/mutations/gqlTypes/CreateCheckout";

export type AddressInterface = Omit<
  CreateCheckout_checkoutCreate_checkout_shippingAddress,
  "__typename"
>;
