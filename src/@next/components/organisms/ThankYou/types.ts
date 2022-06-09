export interface IProps {
  orderEmail?: string | null;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
}
