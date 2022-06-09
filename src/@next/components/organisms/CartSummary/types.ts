import { IImage, ITaxedMoney } from "@types";
// import { ICheckoutModelPriceValue } from "@nautical/sdk/lib/helpers";
import { ICheckoutModelPriceValue } from "@nautical/helpers";

export interface ICostLine {
  name: string;
  cost?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue;
  last?: boolean;
  negative?: boolean;
}

export interface ICosts {
  subtotal?: ITaxedMoney | null;
  promoCode?: ITaxedMoney | null;
  shipping?: ITaxedMoney | null;
  total?: ITaxedMoney | null;
  volumeDiscount?: ICheckoutModelPriceValue;
}

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
}

export interface IProps extends ICosts {
  products?: IProduct[];
}
