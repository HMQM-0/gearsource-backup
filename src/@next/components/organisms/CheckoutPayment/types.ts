import { IFormError } from "@types";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  promoCodeErrors?: IFormError[];
  promoCodeDiscount?: IPromoCodeDiscount;
  promoCodeDiscountFormRef?: React.RefObject<HTMLFormElement>;
  promoCodeDiscountFormId?: string;
  addPromoCode: (promoCode: string) => void;
  setPromoCodeErrors?: any;
  removeVoucherCode: (voucherCode: string) => void;
  submitUnchangedDiscount: () => void;
}
