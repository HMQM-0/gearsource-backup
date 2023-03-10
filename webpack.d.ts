declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "draftjs-to-html";
declare module "react-media";
declare module "js-base64";

declare interface Window {
  PasswordCredential: any;
  Stripe: any;
  Cypress?: any;
  AdyenCheckout: any;
}

declare interface Navigator {
  credentials: any;
}
