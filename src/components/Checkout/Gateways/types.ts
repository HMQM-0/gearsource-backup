export interface IFormError {
  message: string;
  field?: string;
}

export interface IPaymentGatewayConfig {
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface IPaymentGateway {
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
}

export interface ICardData {
  /**
   * Card brand.
   */
  brand: string | null | undefined;
  /**
   * First 4 digits of the card number.
   */
  firstDigits: string | null;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits: string;
  /**
   * Two-digit number representing the card’s expiration month.
   */
  expMonth: number | null;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear: number | null;
  config?: IPaymentGatewayConfig[];
  cvv?: number | null;
  fullNumber?: number | null;
}
