import { IFormError } from "@types";

// import { IMultiSellerAvailableShippingMethods_mapping } from "@nautical/sdk/lib/api/Checkout/types";
import { IMultiSellerAvailableShippingMethods_mapping } from "@nautical/api/Checkout/types";

// import { ICheckoutModelLine } from "@nautical/sdk/lib/helpers";
import { ICheckoutModelLine } from "@nautical/helpers";
// import { Checkout_availableShippingMethods } from "@nautical/sdk/lib/fragments/gqlTypes/Checkout";
import { Checkout_availableShippingMethods } from "@nautical/fragments/gqlTypes/Checkout";

export interface IShippingMethodPrice {
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface IShippingMethod {
  /**
   * The ID of the shipping method.
   */
  id: string;
  name: string;
  price: IShippingMethodPrice | null;
}

// export interface ISellerLineMapping {
// seller: number;
// lines: ICheckoutModelLine[];
// }

export interface IProps {
  shippingMethods?: IShippingMethod[] | Checkout_availableShippingMethods[];
  sellerShippingMethods?: IMultiSellerAvailableShippingMethods_mapping[];
  selectedShippingMethodId?: string;
  selectedShippingMethodIds?: string;
  selectShippingMethod?: (shippingMethodId: string) => void;
  selectSellerShippingMethods?: (
    seller: number,
    shippingMethodSelection: string
  ) => void;
  // lines?: ICheckoutModelLine[];
  // sellerLineMapping?: ISellerLineMapping;
  sellerLineMapping?: {
    [key: number]: ICheckoutModelLine[];
  };
  lines?: ICheckoutModelLine[];
  sellerName?: string;
  seller?: string;
  errors?: IFormError[];
  setErrors?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  onFieldChange?: (field: string, value: any) => void;
  values?: {
    [key: string]: string | undefined;
  };
}
