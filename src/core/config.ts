/* eslint-disable global-require */

// import {
//   generateMicrositeUrl,
//   // generatePageUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 12;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: {
    label: "Braintree",
  },
  DUMMY: {
    label: "Dummy",
  },
  DUMMY_CREDIT_CARD: {
    label: "Dummy Credit Card",
  },
  STRIPE: {
    label: "Stripe",
  },
  ADYEN: {
    label: "Adyen",
    script: {
      src: "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
      integrity:
        "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
      crossOrigin: "anonymous",
    },
    style: {
      src: "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
      integrity:
        "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
      crossOrigin: "anonymous",
    },
  },
  AUTHORIZENET: {
    label: "Authorize.Net",
  },
};
export const STATIC_PAGES = [
  // {
  //   label: "About",
  //   url: generatePageUrl("about"),
  // },
];
export const SOCIAL_MEDIA = [
  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/nauticalcommerce/",
  },
  {
    ariaLabel: "github",
    href: "https://github.com/nauticalcommerce",
  },
  {
    ariaLabel: "instagram",
    href: "https://www.instagram.com/nauticalcommerce/",
  },
  {
    ariaLabel: "linkedin",
    href: "https://www.linkedin.com/ryanjlee/",
  },
  {
    ariaLabel: "medium",
    href: "https://medium.com/@nauticalcommerce",
  },
  {
    ariaLabel: "reddit",
    href: "https://reddit.com/nauticalcommerce",
  },
  {
    ariaLabel: "slack",
    href: "https://slack.com/nauticalcommerce",
  },
  {
    ariaLabel: "twitter",
    href: "https://twitter.com/nauticalcom",
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCA_fdbm17qpdAICbZHNjEtg/",
  },
];
export const META_DEFAULTS = {
  custom: [],
  description: "Marketplace PWA storefront powered by a modern GraphQL API",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Nautical Commerce Storefront",
  type: "website",
  url: window.location.origin,
};
export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
  PaymentConfirm,
}
export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Address",
    nextActionName: "Continue to Shipping",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/shipping",
    name: "Shipping",
    nextActionName: "Continue to Payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: "/checkout/payment",
    name: "Payment",
    nextActionName: "Continue to Review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: "/checkout/review",
    name: "Review",
    nextActionName: "Place order",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
  {
    index: 4,
    link: "/checkout/payment-confirm",
    name: "Payment confirm",
    onlyIfShippingRequired: false,
    step: CheckoutStep.PaymentConfirm,
    withoutOwnView: true,
  },
];

// export const MICROSITE_CHECKOUT_STEPS = !!isMicrosite()
//   ? [
//       {
//         index: 0,
//         link: `${generateMicrositeUrl(
//           getMicrositeId(),
//           getMicrositeSlug()
//         )}checkout/address`,
//         name: "Address",
//         nextActionName: "Continue to Shipping",
//         onlyIfShippingRequired: false,
//         step: CheckoutStep.Address,
//       },
//       {
//         index: 1,
//         link: `${generateMicrositeUrl(
//           getMicrositeId(),
//           getMicrositeSlug()
//         )}checkout/shipping`,
//         name: "Shipping",
//         nextActionName: "Continue to Payment",
//         onlyIfShippingRequired: true,
//         step: CheckoutStep.Shipping,
//       },
//       {
//         index: 2,
//         link: `${generateMicrositeUrl(
//           getMicrositeId(),
//           getMicrositeSlug()
//         )}checkout/payment`,
//         name: "Payment",
//         nextActionName: "Continue to Review",
//         onlyIfShippingRequired: false,
//         step: CheckoutStep.Payment,
//       },
//       {
//         index: 3,
//         link: `${generateMicrositeUrl(
//           getMicrositeId(),
//           getMicrositeSlug()
//         )}checkout/review`,
//         name: "Review",
//         nextActionName: "Place order",
//         onlyIfShippingRequired: false,
//         step: CheckoutStep.Review,
//       },
//       {
//         index: 4,
//         link: `${generateMicrositeUrl(
//           getMicrositeId(),
//           getMicrositeSlug()
//         )}checkout/payment-confirm`,
//         name: "Payment confirm",
//         onlyIfShippingRequired: false,
//         step: CheckoutStep.PaymentConfirm,
//         withoutOwnView: true,
//       },
//     ]
//   : [];
