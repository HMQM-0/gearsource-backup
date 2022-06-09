// import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControlLabel,
  Link,
  MenuItem,
  Popover,
  Switch,
  Tab,
  Tabs,
  Theme,
  Typography,
  LinearProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LockIcon from "@mui/icons-material/Lock";
import { IItems } from "@temp/@nautical/api/Cart/types";
import {ICheckoutModelPriceValue, LocalStorageItems} from "@temp/@nautical/helpers";
import { ICardData, IFormError, ITaxedMoney } from "@types";
import * as React from "react";
import CartSummary from "./CartSummary";
import { IProduct } from "./types";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useAuth, useCheckout } from "@nautical/react";
import { TypedSellerNameQuery } from "@components/organisms/CheckoutShipping/queries";
import { CachedImage } from "@components/molecules";
import { Money } from "@components/containers";
import { StripePaymentGateway } from "@components/organisms";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import Loader from "@temp/components/Loader";
import * as Yup from "yup";
import { maybe } from "@utils/misc";
import { LoyaltyPoints } from "@components/organisms/LoyaltyPoints";
import { AuthorizeNetPaymentGateway } from "@components/organisms/AuthorizeNetPaymentGateway/AuthorizeNetPaymentGateway";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { Plugins } from "@temp/@nautical";
import {
  useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints,
  useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord,
} from "@nautical/react/mutations";
import { PurchaseOrderGateway } from "@components/organisms/PurchaseOrderGateway/PurchaseOrderGateway";
import { checkoutMessages, commonMessages } from "@temp/intl";
import { useIntl } from "react-intl";
import InnerHTML from "dangerously-set-html-content";
import { useGetShippyProApiKeyForScript } from "../../@nautical/react/queries";
import { usePersistedState } from "@temp/_nautical/hooks/usePersistedState";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  backdropWhite: {
    backgroundColor: "#FFF",
    maxWidth: 800,
    width: "100%",
    justifySelf: "end",
    padding: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      borderTop: `1px solid ${theme.palette.divider}`,
    }
  },
  breadcrumb: {
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "center",
    },
  },
  button: {
    borderRadius: 2,
    "& .MuiButton-label": {
      fontSize: "1.0rem",
      fontWeight: 400,
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: 84,
    },
  },
  buttonGroupButton: {
    borderWidth: "1px important",
    borderColor: `${theme.palette.divider}`,
    fontSize: "1rem",
  },
  buttonHider: {
    "& #btnShowMap": {
      display: "none !important",
    },
    width: "100%",
  },
  buttonPopover: {
    borderRadius: 8,
    minWidth: 180,
    fontSize: "0.8rem",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    minHeight: 43,
    marginLeft: "0 !important",
  },
  buttonShippyProMap: {
    display: "block",
    background: "#003563",
    color: "white",
    height: "25px",
    width: "200px",
    borderRadius: "2px",
    fontWeight: "bold",
  },
  buttonText: {
    borderRadius: 2,
    "& .MuiButton-label": {
      color: theme.palette.text.disabled,
      fontSize: "1.0rem",
      fontWeight: 400,
      justifyContent: "start",
      marginLeft: 12,
    },
  },
  cardButtonActive: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.getContrastText(theme.palette.primary.main)}`,
    fontSize: "0.9rem",
  },
  cardButton: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
  },
  cardGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    flexFlow: "wrap",
    gap: 16,
  },
  cartSummary: {
    backgroundColor: "#F8FAFB",
    maxWidth: 410,
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      padding: "0 30px 10px 16px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      padding: theme.spacing(0),
      gridRow: 1,
      borderLeft: "none",
    },
  },
  checkoutBanner: {
    placeContent: "center",
    backgroundColor: "#FFF",
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: 96,
    width: "100vw",
  },
  checkoutWrapper: {
    background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    minHeight: "calc(100% - 96px)",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  checkoutGrid: {
    // backgroundColor: 'transparent',
    // border: `1px solid ${theme.palette.divider}`,
    // display: 'grid',
    // gridTemplateColumns: '1fr 40%',
    // height: '100%',
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: 36,
      marginBottom: 48,
    },
  },
  buttonsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  gridspan: {
    gridColumn: "1 / span 2",
  },
  marginBottomDivider: {
    marginBottom: "12px",
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: 84,
  },
  productShippingRow: {
    display: "grid",
    marginTop: "16px",
    gridRowGap: "6px",
    gridColumnGap: "20px",
    gridTemplateColumns: "72px auto 50px",
    "& img": {
      maxHeight: 72,
      maxWidth: 72,
    },
  },
  popoverActions: {
    justifyContent: "space-around",
    display: "flex",
    // flex-direction: column;
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
  quantityText: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  selectLocation: {
    color: theme.palette.primary.light,
    fontSize: "0.80rem",
    fontWeight: "bold",
  },
  sellerName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  sellerShippingMethodSelect: {
    display: "grid",
    gridTemplateColumns: "auto 200px",
  },
  shippingCard: {
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
  shippingMethodSelectMenuName: {
    width: "100%",
  },
  shippingMethodSelectMenuOption: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gridTemplateColumns: "1fr 1fr",
    // gridColumnGap: "0.2fr"
  },
  shippingMethodSelectMenuPrice: {
    width: "100%",
    alignContent: "flex-end",
  },
  stackedText: {
    display: "grid",
    marginTop: "auto",
    marginBottom: "auto",
    gridTemplateColumns: "auto",
  },
  tabs: {
    borderBottom: "1px solid #ddd",
    marginBottom: 16,
    "& .MuiTab-wrapper": {
      fontWeight: 600,
    },
  },
  textfield: {
    marginTop: 8,
    "& .MuiFormLabel-root": {
      left: -12,
      marginBottom: 0,
      textTransform: "uppercase",
      top: -8,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      height: 56,
      top: 0,
      "& legend": {
        display: "none",
      },
    },
  },
  title: {
    marginBottom: 16,
  },
}));

interface ICheckoutProps {
  subtotal: ITaxedMoney | null | undefined;
  promoCode?: ITaxedMoney | null | undefined;
  shipping?: ITaxedMoney | null | undefined;
  total?: ITaxedMoney | null | undefined;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
  products?: IProduct[] | null;
  items?: IItems | null;
  logo?: React.ReactNode;
  close?(): void;
}

const MuiCheckout: React.FunctionComponent<ICheckoutProps> = (props) => {
  const {
    items,
    subtotal,
    promoCode,
    shipping,
    total,
    logo,
    volumeDiscount,
    close,
  } = props;

  const intl = useIntl();

  // STATE
  // const [method, setMethod] = React.useState('creditcard');
  const [value, setValue] = React.useState("customer");
  const [loading, setLoading] = React.useState(false);
  const [customerFormError, setCustomerFormError] = React.useState(false);
  const [billingFormError, setBillingFormError] = React.useState(false);
  const [paymentFormError, setPaymentFormError] = React.useState(false);
  const [shippingFormError, setShippingFormError] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [popover, setPopover] = React.useState(false);
  const [loyaltyAndReferralsActive, setLoyaltyAndReferralsActive] =
    React.useState(false);
  const [
    loyaltyPointsToBeEarnedOnOrderComplete,
    setLoyaltyPointsToBeEarnedOnOrderComplete,
  ] = React.useState(0);
  const [shippyProPluginActive, setShippyProPluginActive] =
    React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );
  const [
    secondaryLocationSelectedForSellers,
    setSecondaryLocationSelectedForSellers,
  ] = React.useState({});
  // Setting false as a string becasue usePersistedState leverages localStorage,
  // which stores and returns all values for set key-value pairs as strings
  const [shippyProLoaded, setShippyProLoaded] = usePersistedState("shippyProLoaded", "unknown");
  const [shippyProApiKey, setShippyProApiKey] = React.useState<string>("");
  const [customerAddress, setCustomerAddress] = React.useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    postalCode: "",
    countryArea: "",
    phone: "",
    country: {
      code: "",
      country: "",
    },
  });

  // VARIABLES
  const [params] = useSearchParams();
  // This script comes from ShippyPro Live Checkout
  const shippyProLiveCheckoutMapHtml = `
    <script maps
        id="shippyProMap"
        src="https://www.shippypro.com/maps/mapsDropOffPoints.js"
        key=${shippyProApiKey}
        country=${customerAddress.country.code}
        city=${customerAddress.city}
        zip=${customerAddress.postalCode}
        callback="onShippyProSelect"
        load="onShippyProLoad"
    ></script>
`;
  // CONTEXT
  const { activePlugins } = React.useContext(ShopContext);

  // CUSTOM HOOKS
  const {
    setBillingAddress,
    setShippingAddress,
    setSellerShippingMethods,
    availableShippingMethodsBySeller,
    availablePaymentGateways,
    billingAsShipping,
    setBillingAsShippingAddress,
    checkout,
    createPayment,
    completeCheckout,
    loaded: checkoutLoaded,
  } = useCheckout();

  const { user } = useAuth();
  const { countries } = React.useContext(ShopContext);

  // QUERIES
  const { data: shippyProApiKeyData } = useGetShippyProApiKeyForScript({
    fetchPolicy: "network-only",
  });

  // MUTATIONS
  const [createOrUpdateCustomerRecord /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsCreateOrUpdateCustomerRecord();
  const [awardCustomerLoyaltyPoints /*, { data, loading, error }*/] =
    useYotpoLoyaltyAndReferralsAwardCustomerLoyaltyPoints();

  // USE EFFECT
  React.useEffect(() => {
    // @ts-ignore
    window.onShippyProSelect = async (location) => {
      setShippingFormError(false);
      setErrorMessages([]);
      const shippingMethodsBySeller = JSON.parse(
        localStorage.getItem("shippingMethodsBySeller")
      );
      const sellerId = parseInt(localStorage.getItem("shippyProSeller"));
      const shippingMethodSelection = getSelectedShippingMethodForSeller(
        location.courier,
        shippingMethodsBySeller,
        sellerId
      );
      const firstName = localStorage.getItem("shippyProToAddressFirstName");
      const lastName = localStorage.getItem("shippyProToAddressLastName");
      const country = localStorage.getItem("shippyProToAddressCountry");
      const phone = localStorage.getItem("shippyProToAddressPhone");
      const secondaryAddress = `${firstName}, ${lastName}, ${location.address}, ${country}, ${phone}`;

      const { dataError } = await setSellerShippingMethods(
        sellerId,
        shippingMethodSelection,
        secondaryAddress
      );

      const errors = dataError?.error;
      if (errors) {
        setShippingFormError(true);
        handleErrors(errors);
      }

      resetSecondaryLocationSelectedForSellers();
    };

    // @ts-ignore
    window.onShippyProLoad = () => {
      setShippyProLoaded("true");
    };

    return () => {
      // @ts-ignore
      window.onShippyProSelect = undefined;
      // @ts-ignore
      window.onShippyProLoad = undefined;
    };
  }, []);

  React.useEffect(() => {
    if (value === "shipping") {
      resetSecondaryLocationSelectedForSellers();
    }
  }, [value]);

  React.useEffect(() => {
    if (
      params.get("payment_intent") &&
      params.get("payment_intent_client_secret") &&
      checkout
    ) {
      handleCreatePayment(
        "nautical.payments.stripe",
        params.get("payment_intent")
      );
    }
  }, [params, checkout]);

  React.useEffect(() => {
    const yotpoLoyaltyAndReferralsPluginActive = Boolean(
      activePlugins.find(
        (plugin) => plugin.identifier === Plugins.YOTPO_LOYALTY
      )
    );
    setLoyaltyAndReferralsActive(yotpoLoyaltyAndReferralsPluginActive);

    const shippyProPluginActive = Boolean(
      activePlugins.find((plugin) => plugin.identifier === Plugins.SHIPPYPRO)
    );
    setShippyProPluginActive(shippyProPluginActive);
  }, []);

  React.useEffect(() => {
    if (user) {
      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      createOrUpdateCustomerRecord({ user: userInfo });
    }
  }, [loyaltyAndReferralsActive]);

  React.useEffect(() => {
    if (
      shippyProApiKeyData?.shippyProApiKeyForScript?.active &&
      shippyProApiKeyData?.shippyProApiKeyForScript?.apiKey
    ) {
      setShippyProApiKey(shippyProApiKeyData.shippyProApiKeyForScript.apiKey);
    }
  }, [shippyProApiKeyData]);

  // HELPER FUNCTIONS
  const resetSecondaryLocationSelectedForSellers = () => {
    const locallyStoredCheckoutData = JSON.parse(
      localStorage.getItem(LocalStorageItems.CHECKOUT)
    );
    const locallyStoredSellerShippingMethods = JSON.parse(
      locallyStoredCheckoutData.sellerShippingMethods
    );
    const updatedSecondaryLocationSelectedForSeller = {};
    locallyStoredSellerShippingMethods.forEach(
      (locallyStoredSellerShippingMethod) => {
        const secondaryLocationSelectedForSeller =
          locallyStoredSellerShippingMethod.shippingMethod
            .requires_secondary_address &&
          locallyStoredSellerShippingMethod.shippingMethod.secondary_address;
        updatedSecondaryLocationSelectedForSeller[
          locallyStoredSellerShippingMethod.seller
        ] = secondaryLocationSelectedForSeller;
      }
    );
    setSecondaryLocationSelectedForSellers(
      updatedSecondaryLocationSelectedForSeller
    );
  };

  const trimAddress = (address) => {
    return address.split(", ").slice(2, 6).join(" ");
  };

  const getSelectedShippingMethodForSeller = (
    selectedCourier,
    shippingMethodsBySeller,
    sellerId
  ) => {
    // IN SHIPPYPRO THUS FAR IT APPEARS THE CARRIERS WITH SERVICES THAT
    // INCLUDE THE WORD "RELIAS" ARE THE ONES THAT SUPPORT DROP OFF POINTS
    const dropOffPointServiceIndicator = "Relais";
    const shippingMethodsForSeller = shippingMethodsBySeller.find(
      (shippingMethodBySeller) => shippingMethodBySeller.seller === sellerId
    ).value;
    return shippingMethodsForSeller.find(
      (shippingMethodForSeller) =>
        shippingMethodForSeller.name.includes(selectedCourier) &&
        shippingMethodForSeller.name.includes(dropOffPointServiceIndicator)
    ).id;
  };

  // EVENT HANDLERS
  const handleChange = async (event, newValue, values = null) => {
    if (shippyProPluginActive && shippyProLoaded !== "false") {
      // MAKE SURE SHIPPYPRO MAP REMAINS AT A HEIGHT OF 100%...
      // FOR SOME REASON, ONCE YOU OPEN MAP AND THEN GO TO NEXT CHECKOUT
      // STEP, THE HEIGHT GOES TO 300px. SO WHEN YOU GO BACK TO SHIPPING
      // STEP TO REOPEN, IT ONLY SHOWS 300px IN HEIGHT OF THE MAP, NOT
      // THE FULL MAP.
      const shippyProMapOverlay = document.getElementById("_shp");
      if (shippyProMapOverlay) {
        shippyProMapOverlay.style.height = "100%";
      }
      // CHECK IF VIA SWITCHING BACK-AND-FORTH BETWEEN CHECKOUT STEPS, THE BUTTON
      // INJECTED BY SHIPPYPRO WITH id="btnShowMap" HAS MAGICALLY DISAPPEARED. IF
      // IT HAS, WE NEED TO ADD IT BACK SO WE CAN CONTINUE TO CHANGE DROPOFF POINTS.
      const shippyProMapScriptExists = document.getElementById("shippyProMap");
      const btnShowMapButtonExists = document.getElementById("btnShowMap");
      if (shippyProMapScriptExists && !btnShowMapButtonExists) {
        function showMapFunction() {
          // @ts-ignore
          shp.start(this);
          return false;
        }
        // RECREATE THE LOST SHIPPYPRO BUTTON ELEMENT
        const newBtnShowMapButton = document.createElement("button");
        newBtnShowMapButton.onclick = showMapFunction;
        newBtnShowMapButton.classList.add("trans500");
        newBtnShowMapButton.id = "btnShowMap";
        newBtnShowMapButton.style.display = "none !important";
        // TOSS IT BACK WHERE WE INITIALLY PUT IT IN THE DOM.
        const targetElement = document.getElementById("shippyProMap");
        targetElement.parentNode.insertBefore(
          newBtnShowMapButton,
          targetElement.nextSibling
        );
      }
    }

    if (value === "customer") {
      setLoading(true);
      const shippingAddress = {
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        streetAddress1: values.streetAddress1,
        streetAddress2: values.streetAddress2,
        city: values.city,
        postalCode: values.postalCode,
        countryArea: values.countryArea,
        phone: values.phone,
        country: values.country,
      };
      const shippingSubmission = await setShippingAddress(
        shippingAddress,
        values.email
      );
      // HAVE TO STORE THESE VALUES IN LOCALSTORAGE SO THEY ARE AVAILABLE TO WINDOW.ONSHIPPYPROSELECT
      // CAN'T RETRIEVE THEM FROM STATE WHEN WINDOW.ONSHIPPYPROSELECT INVOKED
      localStorage.setItem(
        "shippyProToAddressFirstName",
        shippingAddress.firstName
      );
      localStorage.setItem(
        "shippyProToAddressLastName",
        shippingAddress.lastName
      );
      localStorage.setItem(
        "shippyProToAddressCountry",
        shippingAddress.country.code
      );
      localStorage.setItem("shippyProToAddressPhone", shippingAddress.phone);
      setCustomerAddress(shippingAddress);
      setLoading(false);
      if (shippingSubmission.dataError?.error) {
        setCustomerFormError(true);
        handleErrors(shippingSubmission.dataError.error);
        return;
      } else {
        setCustomerFormError(false);
        setValue(newValue);
      }
    } else if (value === "shipping") {
      if (newValue === "payment") {
        const sellerShippingMethods = JSON.parse(
          // @ts-ignore
          checkout.sellerShippingMethods
        );

        const allSelectedShippingMethodsAllowed = sellerShippingMethods.every((selectedSellerShippingMethod) => {
          const sellerAvailableShippingMethods = availableShippingMethodsBySeller.find((availableSellerShippingMethods) =>
            // TODO: JSON.parse returns `seller` as a string, while it should be number
            Number(selectedSellerShippingMethod.seller) === availableSellerShippingMethods.seller
          );
          return sellerAvailableShippingMethods?.value.some((sellerAvailableShippingMethod) =>
            sellerAvailableShippingMethod.id === selectedSellerShippingMethod.shippingMethod.id
          );
        });

        if (!allSelectedShippingMethodsAllowed) {
          setShippingFormError(true);
          setErrorMessages(["Please select available shipping method(s). Selected shipping method(s) is not available in your country."]);
          return;
        }

        const shippingMethodSelectedForEachOrder =
          sellerShippingMethods.length ===
          availableShippingMethodsBySeller.length;
        const allSecondaryAddressesSelectedWhereRequired =
          sellerShippingMethods.every((sellerShippingMethod) => {
            const shippingMethod = sellerShippingMethod.shippingMethod;
            return (
              (shippingMethod.requires_secondary_address &&
                shippingMethod.secondary_address) ||
              (!shippingMethod.requires_secondary_address &&
                !shippingMethod.secondary_address)
            );
          });

        if (
          shippingMethodSelectedForEachOrder &&
          allSecondaryAddressesSelectedWhereRequired
        ) {
          setValue(newValue);
          setShippingFormError(false);
          setErrorMessages([]);
        } else {
          setShippingFormError(true);
          setErrorMessages(
            ["Please make sure you select your drop-off point(s) from the map(s)."]
          );
        }
      }
      if (newValue === "customer") {
        setShippingFormError(false);
        setErrorMessages([]);
        setValue(newValue);
      }
    } else if (value === "payment") {
      if (newValue === "shipping") {
        setValue(newValue);
      } else {
        setLoading(true);
        if (billingAsShipping) {
          const billingSubmission = await setBillingAddress(
            {
              firstName: values.firstName,
              lastName: values.lastName,
              companyName: values.companyName,
              streetAddress1: values.streetAddress1,
              streetAddress2: values.streetAddress2,
              city: values.city,
              postalCode: values.postalCode,
              countryArea: values.countryArea,
              phone: values.phone,
              country: values.country,
            },
            values.email
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            document.getElementById("gatewayButton").click();
          } else {
            setBillingFormError(true);
            handleErrors(billingSubmission.dataError.error);
          }
        } else {
          const billingSubmission = await setBillingAddress(
            {
              firstName: values.billingFirstName,
              lastName: values.billingLastName,
              companyName: values.billingCompanyName,
              streetAddress1: values.billingStreetAddress1,
              streetAddress2: values.billingStreetAddress2,
              city: values.billingCity,
              postalCode: values.billingPostalCode,
              countryArea: values.billingCountryArea,
              phone: values.billingPhone,
              country: values.billingCountry,
            },
            values.email
          );
          setLoading(false);
          if (!billingSubmission.dataError) {
            document.getElementById("gatewayButton").click();
          } else {
            setBillingFormError(true);
            handleErrors(billingSubmission.dataError.error);
          }
        }
      }
    }
  };

  const handleSetSellerShippingMethods = async (
    sellerId: number,
    shippingMethodSelection: string
  ) => {
    setLoading(true);

    localStorage.setItem("shippyProSeller", sellerId.toString());
    localStorage.setItem(
      "shippingMethodsBySeller",
      JSON.stringify(availableShippingMethodsBySeller)
    );

    const { dataError } = await setSellerShippingMethods(
      sellerId,
      shippingMethodSelection
    );

    const errors = dataError?.error;
    if (errors) {
      setShippingFormError(true);
      handleErrors(errors);
    }
    setLoading(false);
    resetSecondaryLocationSelectedForSellers();
  };

  const handleBreadcrumb = (newValue) => {
    setValue(newValue);
  };

  const handleCreatePayment = async (
    gateway: string,
    token?: string,
    creditCardData?: ICardData,
    poNumber?: string
  ) => {
    let errors: any[] = [];

    const { dataError } = await createPayment({
      gateway,
      token,
      // @ts-ignore
      creditCard: creditCardData,
      // returnUrl: `${window.location.origin}${paymentConfirmStepLink}`,
    });
    errors = dataError?.error;

    if (!errors) {
      const response = await completeCheckout({
        poNumber: poNumber,
      });
      if (!response.dataError?.error) {
        if (loyaltyAndReferralsActive) {
          if (user) {
            awardCustomerLoyaltyPoints({
              input: {
                customerEmail: user.email,
                pointAdjustmentAmount: loyaltyPointsToBeEarnedOnOrderComplete,
                applyAdjustmentToPointsEarned: true,
              },
            });
          }
        }
        // Reset checkout for subsequent checkouts
        navigate("/order-finalized/", {
          // navigate("/order-history/" + response.data?.order?.token, {
          replace: true,
          state: {
            confirmationData: response.data?.confirmationData,
            confirmationNeeded: response.data?.confirmationNeeded,
            order: response.data?.order,
            errors: response.dataError?.error,
            token: response.data?.order?.token,
            orderNumber: response.data?.order?.number,
          },
        });
      } else {
        errors = response.dataError?.error;
        handleErrors(errors);
        setPaymentFormError(errors.length > 0);
      }
      // return {
      //     confirmationData: response.data?.confirmationData,
      //     confirmationNeeded: response.data?.confirmationNeeded,
      //     order: response.data?.order,
      //     errors: response.dataError?.error,
      // };
    } else {
      handleErrors(errors);
      setPaymentFormError(errors.length > 0);
    }
  };

  const handleErrors = (errors: IFormError[]) => {
    const messages = maybe(() => errors.flatMap((error) => {
      if (!!error.field) {
        return error.message + " - " + error.field
      } else {
        return error.message
      }
    }), []);
    const errorVariants = maybe(() => errors.flatMap((error) => error.variants), []);
    const variantNames = errorVariants.map(errorVariant => {
      const problemVariant = items.find(item => item.variant.id === errorVariant);
      if (!!problemVariant) {
        return problemVariant.variant.product.name + " - " + problemVariant.variant.name;
      } else {
        return ""
      }
    });
    const errorMessages = messages.concat(variantNames)
    setErrorMessages(errorMessages);
  };

  const authNetResponseHandler = (
    response: any,
    gateway: string,
    creditCardData: ICardData
  ) => {
    if (response.messages.resultCode === "Error") {
      let i = 0;
      while (i < response.messages.message.length) {
        console.error(
          response.messages.message[i].code +
            ": " +
            response.messages.message[i].text
        );
        i = i + 1;
      }
    } else {
      handleCreatePayment(
        gateway,
        response.opaqueData.dataValue,
        creditCardData
      );
    }
  };

  const handleProcessPayment = (
    gateway: string,
    token?: string,
    creditCardData?: ICardData,
    poNumber?: string
  ) => {
    if (gateway === "nautical.payments.authorize_net") {
      const publicClientKey = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "client_key"
      )?.value;
      const apiLoginID = creditCardData?.config?.find(
        (comnfiguration) => comnfiguration.field === "api_login_id"
      )?.value;
      const authData = {
        clientKey: publicClientKey,
        apiLoginID,
      };
      const cardData = {
        cardNumber:
          creditCardData?.fullNumber && creditCardData.fullNumber.toString(),
        month: creditCardData?.expMonth && creditCardData.expMonth.toString(),
        year: creditCardData?.expYear && creditCardData.expYear.toString(),
        cardCode: creditCardData?.cvv && creditCardData.cvv.toString(),
      };
      const secureData = {
        authData,
        cardData,
      };

      const sterilizedCreditCardData = {
        brand: creditCardData?.brand,
        expMonth: creditCardData?.expMonth,
        expYear: creditCardData?.expYear,
        firstDigits: creditCardData?.firstDigits,
        lastDigits: creditCardData?.lastDigits,
      };
      // @ts-ignore
      // Accept is a Javascript Library we imported via a script tag injected into the Head HTML
      // Element of our App via the Helmet React Component.
      // The Helmet component with this script can be found in the AuthorizeNetPaymentGateway(.tsx) component.
      Accept.dispatchData(secureData, (res) =>
        authNetResponseHandler(res, gateway, sterilizedCreditCardData)
      );
    } else if (gateway === "nautical.payments.purchase_order") {
      handleCreatePayment(gateway, token, creditCardData, poNumber);
    } else {
      handleCreatePayment(gateway, token, creditCardData);
    }
  };

  const handlePopover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover(true);
  };

  const handleClose = () => {
    navigate("/cart/");
    setAnchorEl(null);
    setPopover(false);
    close();
  };

  const handleDismiss = () => {
    setAnchorEl(null);
    setPopover(false);
  };

  // OTHER VARIABLES/FUNCTIONS/ETC... ORGANIZE THESE WITHIN THE ABOVE ORGANIZED CODE AT SOME POINT.
  const checkoutGatewayFormId = "gateway-form";
  const checkoutGatewayFormRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const products: IProduct[] | null = items?.map(
    ({ id, variant, totalPrice, quantity }) => ({
      id: id || "",
      name: variant.product?.name || "",
      variant: variant.name || "",
      price: {
        gross: {
          amount: totalPrice?.gross.amount || 0,
          currency: totalPrice?.gross.currency || "",
        },
        net: {
          amount: totalPrice?.net.amount || 0,
          currency: totalPrice?.net.currency || "",
        },
      },
      priceUndiscounted: {
        gross: {
          amount: totalPrice?.gross.amount || 0,
          currency: totalPrice?.gross.currency || "",
        },
        net: {
          amount: totalPrice?.net.amount || 0,
          currency: totalPrice?.net.currency || "",
        },
      },
      quantity,
      sku: variant.sku || "",
      thumbnail: {
        alt: variant.product?.thumbnail?.alt || undefined,
        url: variant.product?.thumbnail?.url,
        url2x: variant.product?.thumbnail2x?.url,
      },
    })
  );
  const classes = useStyles({});
  const sellers = checkout?.lines?.map((line) => line.seller);
  const sellerSet = new Set(sellers);
  const mappingDict = {};

  for (const seller of sellerSet) {
    mappingDict[seller?.pk] = checkout?.lines?.filter(
      (line) => line?.seller?.pk === seller?.pk
    );
  }

  const initialSellerValues = {};
  const parsedInitialSellerMethods = JSON.parse(
    // @ts-ignore
    checkout?.sellerShippingMethods ? checkout.sellerShippingMethods : "[]"
  );

  availableShippingMethodsBySeller?.forEach(
    (data) =>
      (initialSellerValues[data.seller] =
        parsedInitialSellerMethods.find((sellerAndMethod) => {
          return +sellerAndMethod.seller === data.seller;
        })?.shippingMethod?.id || [])
  );

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const updateLoyaltyPointsToBeEarnedOnOrderComplete = (points: number) => {
    setLoyaltyPointsToBeEarnedOnOrderComplete(points);
  };

  const loyaltyPointsView = loyaltyAndReferralsActive && user && (
    <LoyaltyPoints
      // activeStepIndex={activeStepIndex}
      netOrderPrice={total?.net.amount}
      totalPrice={total}
      user={user}
      updateLoyaltyPointsToBeEarnedOnOrderComplete={
        updateLoyaltyPointsToBeEarnedOnOrderComplete
      }
    />
  );

  const customerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    streetAddress1: Yup.string().required("Address Line 1 Required"),
    city: Yup.string().required("City Required"),
    //   postalCode: Yup.string().required('Required'),
    //   countryArea: Yup.string().required('Required'),
    phone: Yup.string().required("Phone Required"),
    //   country: Yup.object().required("Country Required"),
    //   billingFirstName: Yup.string().required('Required'),
    //   billingLastName: Yup.string().required('Required'),
    //   billingStreetAddress1: Yup.string().required('Required'),
    //   billingCity: Yup.string().required('Required'),
    //   billingPostalCode: Yup.string().required('Required'),
    //   billingCountryArea: Yup.string().required('Required'),
    //   billingPhone: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required("Email Required"),
  });

  async function handleSubmit(values, { setSubmitting }) {
    setTimeout(() => setSubmitting(false), 5000);
  }

  // @ts-ignore
  const existingShippingChoices = checkout?.sellerShippingMethods ? Object.fromEntries(JSON.parse(checkout.sellerShippingMethods).map(method =>
    ["shippingMethod" + method.seller, method.shippingMethod.id]
  )) : {};

  return (
    <>
      <Box className={classes.checkoutBanner}>
        <Link
          style={{ alignItems: "center", display: "flex" }}
          onClick={handlePopover}
        >
          {logo}
        </Link>
        <Popover
          id={"simple-popover"}
          open={popover}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card>
            <CardContent>{intl.formatMessage(checkoutMessages.areYouSureYouWantToExitCheckout)}</CardContent>
            <CardActions
              className={classes.popoverActions}
              style={{ justifyContent: "space-around" }}
            >
              <Button
                className={classes.buttonPopover}
                size="small"
                variant="outlined"
                onClick={() => handleDismiss()}
              >
                {intl.formatMessage(checkoutMessages.stayInCheckout)}
              </Button>
              <Button
                className={classes.buttonPopover}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                {intl.formatMessage(checkoutMessages.returnToCart)}
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </Box>
      {checkoutLoaded &&
      !params?.get("payment_intent") &&
      !params?.get("payment_intent_client_secret") ? (
        <Box className={classes.checkoutWrapper}>
          <Box className={classes.backdropWhite}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Breadcrumbs
                className={classes.breadcrumb}
                style={{ display: "none" }}
              >
                <Box
                  color={value === "address" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("address")}
                >
                  {intl.formatMessage(checkoutMessages.stepNameAddress)}
                </Box>
                <Box
                  color={value === "shipping" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("shipping")}
                >
                  {intl.formatMessage(checkoutMessages.stepNameShipping)}
                </Box>
                <Box
                  color={value === "payment" ? "secondary" : "inherit"}
                  onClick={() => handleBreadcrumb("payment")}
                >
                  {intl.formatMessage(checkoutMessages.stepNamePayment)}
                </Box>
              </Breadcrumbs>
              <Tabs variant="fullWidth" className={classes.tabs} value={value}>
                <Tab value="customer" label={intl.formatMessage(checkoutMessages.stepNameCustomer)} disableRipple />
                <Tab value="shipping" label={intl.formatMessage(checkoutMessages.stepNameShipping)} disableRipple />
                <Tab value="payment" label={intl.formatMessage(checkoutMessages.stepNamePayment)} disableRipple />
              </Tabs>
            </Box>
            <Formik
              validationSchema={customerValidationSchema}
              initialValues={{
                // CUSTOMER FIELDS
                email: maybe(() => checkout.email, ""),
                // SHIPPING ADDRESS FIELDS
                firstName: checkout?.shippingAddress?.firstName || "",
                lastName: checkout?.shippingAddress?.lastName || "",
                companyName: checkout?.shippingAddress?.companyName || "",
                streetAddress1: checkout?.shippingAddress?.streetAddress1 || "",
                streetAddress2: checkout?.shippingAddress?.streetAddress2 || "",
                city: checkout?.shippingAddress?.city || "",
                postalCode: checkout?.shippingAddress?.postalCode || "",
                countryArea: checkout?.shippingAddress?.countryArea || "",
                phone: checkout?.shippingAddress?.phone || "",
                country: countries.find(country => country.code === checkout?.shippingAddress?.country?.code) || {
                  code: "",
                  country:  "",
                },
                // BILLING ADDRESS FIELDS
                billingAsShipping: billingAsShipping || true,
                billingFirstName: checkout?.billingAddress?.firstName || "",
                billingLastName: checkout?.billingAddress?.lastName || "",
                billingCompanyName: checkout?.billingAddress?.companyName || "",
                billingStreetAddress1:
                  checkout?.billingAddress?.streetAddress1 || "",
                billingStreetAddress2:
                  checkout?.billingAddress?.streetAddress2 || "",
                billingCity: checkout?.billingAddress?.city || "",
                billingPostalCode: checkout?.billingAddress?.postalCode || "",
                billingCountryArea: checkout?.billingAddress?.countryArea || "",
                billingPhone: checkout?.billingAddress?.phone || "",
                billingCountry: countries.find(country => country.code === checkout?.billingAddress?.country?.code) || {
                  code: "",
                  country: "",
                },
                // SHIPPING FIELDS
                ...existingShippingChoices
                // PAYMENT FIELDS
              }}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                validateForm,
                isSubmitting,
                values,
                isValid,
                setSubmitting,
              }) => {
                const formValidation = (event: any) => {
                  validateForm()
                    .then(() => {
                      isValid
                        ? handleChange(event, "shipping", values)
                        : console.info("invalid");
                    })
                    .finally(() => {
                      if (isValid) {
                        setCustomerFormError(false);
                        setErrorMessages([]);
                      } else {
                        setErrorMessages(Object.values(errors));
                        setCustomerFormError(true);
                      }
                    });
                };
                const isAddressFieldRequired = (
                  fieldType: "city" | "state" | "zip",
                  addressType: "customer" | "billing"
                ) => {
                  const fieldTypeLetters: Record<
                    typeof fieldType,
                    "postal_code" | "country_area" | "city" | "street_address"
                  > = {
                    city: "city",
                    state: "country_area",
                    zip: "postal_code",
                  };
                  const countryValue =
                    addressType === "customer"
                      ? values.country
                      : values.billingCountry;
                  return countryValue?.requiredFields?.includes(
                    fieldTypeLetters[fieldType]
                  );
                };
                return (
                  <Form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setSubmitting(true);
                      handleChange(event, "complete", values);
                      setTimeout(() => setSubmitting(false), 5000);
                    }}
                  >
                    <TabPanel value={value} index="customer">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          {intl.formatMessage(
                            checkoutMessages.customerInformation
                          )}
                        </Typography>
                      </Box>
                      <Box className={classes.fieldsGrid}>
                        <Field
                          required
                          autoComplete="shipping given-name"
                          className={classes.textfield}
                          component={TextField}
                          name="firstName"
                          label={intl.formatMessage(commonMessages.firstName)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Field
                          className={classes.textfield}
                          autoComplete="shipping family-name"
                          component={TextField}
                          required
                          name="lastName"
                          label={intl.formatMessage(commonMessages.lastName)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Field
                          className={clsx(classes.textfield, classes.gridspan)}
                          autoComplete="shipping address-line1"
                          component={TextField}
                          required
                          name="streetAddress1"
                          label={intl.formatMessage(
                            checkoutMessages.addressLine,
                            { number: 1 }
                          )}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Field
                          className={clsx(classes.textfield, classes.gridspan)}
                          autoComplete="shipping address-line2"
                          component={TextField}
                          name="streetAddress2"
                          label={intl.formatMessage(
                            checkoutMessages.addressLine,
                            { number: 2 }
                          )}
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        {isAddressFieldRequired("city", "customer") && (
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            required
                            name="city"
                            autoComplete="shipping address-level2"
                            label={intl.formatMessage(checkoutMessages.city)}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                        {isAddressFieldRequired("state", "customer") && (
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            name="countryArea"
                            required
                            autoComplete="shipping address-level1"
                            label={intl.formatMessage(
                              checkoutMessages.stateProvinceArea
                            )}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                        {isAddressFieldRequired("zip", "customer") && (
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            required
                            name="postalCode"
                            label={intl.formatMessage(
                              checkoutMessages.zipPostalCode
                            )}
                            autoComplete="shipping postal-code"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                        {!!countries && (
                          <Field
                            className={classes.textfield}
                            component={TextField}
                            name="country"
                            label={intl.formatMessage(checkoutMessages.country)}
                            variant="outlined"
                            required
                            // NEED TO FIGURE OUT HOW AUTOCOMPLETE INTERACTS WITH DROPDOWN SELECTOR
                            autoComplete="shipping country"
                            InputLabelProps={{ shrink: true }}
                            select
                          >
                            {countries?.map((option) => (
                              // @ts-ignore
                              <MenuItem key={option.code} value={option}>
                                {option.country}
                              </MenuItem>
                            ))}
                          </Field>
                        )}
                      </Box>
                      <Box className={classes.fieldsGrid}>
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          required
                          name="email"
                          label={intl.formatMessage(commonMessages.shortEmail)}
                          type="email"
                          autoComplete="email"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                            helperText: touched ? validateEmail("email") : null,
                          }}
                        />
                        <Field
                          className={classes.textfield}
                          component={TextField}
                          required
                          name="phone"
                          label={intl.formatMessage(commonMessages.phone)}
                          type="tel"
                          autoComplete="shipping tel-national"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                        />
                        <Box
                          style={{
                            display: customerFormError ? "block" : "none",
                          }}
                          className={classes.gridspan}
                        >
                          <Alert severity="error">
                            {errorMessages
                              ? errorMessages.map(message => <Box>{message}</Box>)
                              : intl.formatMessage(
                                  commonMessages.pleaseEnsureAllRequiredFieldsAreEntered
                                )}
                          </Alert>
                        </Box>
                        <Box></Box>
                        <Button
                          color="primary"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          onClick={(e) => formValidation(e)}
                        >
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
                          {loading ? (
                            <CircularProgress />
                          ) : (
                            intl.formatMessage(commonMessages.continue)
                          )}
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index="shipping">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          {intl.formatMessage(checkoutMessages.shippingInformation)}
                        </Typography>
                      </Box>
                      {availableShippingMethodsBySeller?.map((sellerMethod) => (
                        <TypedSellerNameQuery
                          variables={{ id: String(sellerMethod.seller) }}
                        >
                          {({ data, loading, error }) => {
                            // @ts-ignore
                            const requiresSecondaryAddress = JSON.parse(
                              // @ts-ignore
                              checkout.sellerShippingMethods
                            ).find(
                              (sellerShippingMethod) =>
                                sellerShippingMethod.seller.toString() ===
                                sellerMethod.seller.toString()
                            )?.shippingMethod.requires_secondary_address;
                            return (
                              <Box>
                                <Box mb={2}>
                                  <Box
                                    className={
                                      classes.sellerShippingMethodSelect
                                    }
                                  >
                                    <Typography
                                      variant="h4"
                                      className={classes.sellerName}
                                    >
                                      {data?.sellerName?.companyName}
                                    </Typography>
                                    <Field
                                      className={classes.textfield}
                                      component={TextField}
                                      name={
                                        "shippingMethod" +
                                        String(sellerMethod.seller)
                                      }
                                      label={intl.formatMessage(checkoutMessages.shippingMethod)}
                                      variant="outlined"
                                      InputLabelProps={{ shrink: true }}
                                      select
                                      required
                                    >
                                      {sellerMethod.value.map((option) => (
                                        <MenuItem
                                          key={option.id}
                                          value={option.id}
                                          onClick={(event) =>
                                            handleSetSellerShippingMethods(
                                              sellerMethod.seller,
                                              option.id
                                            )
                                          }
                                        >
                                          <Box
                                            className={
                                              classes.shippingMethodSelectMenuOption
                                            }
                                          >
                                            <Box
                                              className={
                                                classes.shippingMethodSelectMenuName
                                              }
                                            >
                                              <Typography>
                                                {option.name}&nbsp;|&nbsp;
                                              </Typography>
                                            </Box>
                                            <Box
                                              className={
                                                classes.shippingMethodSelectMenuPrice
                                              }
                                            >
                                              <Money money={option.price} />
                                            </Box>
                                          </Box>
                                        </MenuItem>
                                      ))}
                                    </Field>
                                    {shippyProPluginActive &&
                                    requiresSecondaryAddress ? (
                                      <>
                                        <Typography></Typography>
                                        <Typography variant="caption">
                                          <span>Pickup Location: </span>
                                          <div className={classes.buttonHider}>
                                            <InnerHTML
                                              html={
                                                shippyProLiveCheckoutMapHtml
                                              }
                                            />
                                            {/* THIS BUTTON WAS GRABBED FROM THE DOM. IT IS INJECTED INTO
                                            THE DOM VIA shippyProLiveCheckoutMapHtml. IT WAS PLACED HERE
                                            IN ORDER TO BE ABLE TO RENDER MULTIPLE SHIPPYPRO MAPS ON THE
                                            PAGE AND TO GET UNIQUE BEHAVIOR FROM EACH MAP ON A PER SELLER
                                            BASIS. THE shp OBJECT COMES FROM shippyProLiveCheckoutMapHtml */}
                                            {shippyProLoaded !== "false" ? (
                                              <button
                                                className={
                                                  classes.buttonShippyProMap
                                                }
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "shippyProSeller",
                                                    sellerMethod.seller.toString()
                                                  );
                                                  const elem =
                                                    document.getElementById(
                                                      "btnShowMap"
                                                    );
                                                  // @ts-ignore
                                                  shp.start(elem);
                                                  return false;
                                                }}
                                              >
                                                CHOOSE A LOCATION
                                              </button>
                                            ) : (
                                              <Box
                                                sx={{
                                                  width: "80%",
                                                  margin: "5px 0 0 17px",
                                                }}
                                              >
                                                <LinearProgress />
                                              </Box>
                                            )}
                                          </div>
                                          {secondaryLocationSelectedForSellers[
                                            sellerMethod.seller
                                          ] && (
                                            <span>
                                              {trimAddress(
                                                secondaryLocationSelectedForSellers[
                                                  sellerMethod.seller
                                                ]
                                              )}
                                            </span>
                                          )}
                                        </Typography>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </Box>
                                  {mappingDict[sellerMethod.seller]?.map(
                                    (sellerMapping) => (
                                      <Box
                                        className={classes.productShippingRow}
                                      >
                                        <CachedImage
                                          {...sellerMapping.variant?.product
                                            ?.thumbnail}
                                        />
                                        <Box className={classes.stackedText}>
                                          <Typography>
                                            {
                                              sellerMapping.variant?.product
                                                ?.name
                                            }
                                          </Typography>
                                          <Typography variant="caption">
                                            {sellerMapping.variant?.name}
                                          </Typography>
                                        </Box>
                                        <Typography
                                          className={classes.quantityText}
                                        >
                                          {"Qty: " + sellerMapping.quantity}
                                        </Typography>
                                      </Box>
                                    )
                                  )}
                                </Box>
                                <Divider
                                  className={classes.marginBottomDivider}
                                />
                              </Box>
                            );
                          }}
                        </TypedSellerNameQuery>
                      ))}
                      <Box
                        style={{
                          display: shippingFormError ? "block" : "none",
                        }}
                        className={classes.gridspan}
                      >
                        <Alert severity="error">{errorMessages.map(message => <Box>{message}</Box>)}</Alert>
                      </Box>
                      <Box className={classes.fieldsGrid}>
                        <Button
                          disableRipple
                          disableElevation
                          className={classes.buttonText}
                          onClick={(e) => handleChange(e, "customer")}
                        >
                          <KeyboardBackspaceIcon /> {intl.formatMessage(checkoutMessages.backToInformation)}
                        </Button>
                        <Button
                          color="primary"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          onClick={(e) => handleChange(e, "payment", values)}
                        >
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
                          {intl.formatMessage(commonMessages.continue)}
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel value={value} index="payment">
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          {intl.formatMessage(
                            checkoutMessages.paymentInformation
                          )}
                        </Typography>
                      </Box>
                      {/* <Box>
                            <Box className={classes.cardGroup}>
                                <Card variant='outlined' className={method === "creditcard" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "creditcard")}>
                                    <PaymentOutlinedIcon fontSize='large' />
                                    Credit Card
                                </Card>
                                <Card variant='outlined' className={method === "banktransfer" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "banktransfer")}>
                                    <AccountBalanceOutlinedIcon fontSize='large' />
                                    Bank Transfer
                                </Card>
                                <Card variant='outlined' className={method === "purchaseorder" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "purchaseorder")}>
                                    <DescriptionOutlinedIcon fontSize='large' />
                                    Purchase Order
                                </Card>
                                <Card variant='outlined' className={method === "digitalwallet" ? classes.cardButtonActive : classes.cardButton} onClick={(e) => handleMethod(e, "digitalwallet")}>
                                    <AccountBalanceWalletOutlinedIcon fontSize='large' />
                                    Wallets &amp; More
                                </Card>
                            </Box>
                      </Box> */}
                      {availablePaymentGateways?.map(({ id, name, config }) => {
                        switch (name) {
                          case "Stripe":
                            return (
                              <StripePaymentGateway
                                config={config}
                                formRef={checkoutGatewayFormRef}
                                formId={checkoutGatewayFormId}
                                processPayment={(token, cardData) => {
                                  handleProcessPayment(id, token, cardData);
                                }}
                                errors={[]}
                                onError={(errors) => handleErrors(errors)}
                                total={total}
                              />
                            );
                          case "Authorize.Net":
                            return (
                              <AuthorizeNetPaymentGateway
                                config={config}
                                formRef={checkoutGatewayFormRef}
                                formId={checkoutGatewayFormId}
                                processPayment={(token, cardData) =>
                                  handleProcessPayment(id, token, cardData)
                                }
                                errors={[]}
                                onError={(errors) => handleErrors(errors)}
                              />
                            );
                          case "Purchase Order":
                            return (
                              <PurchaseOrderGateway
                                formRef={checkoutGatewayFormRef}
                                formId={checkoutGatewayFormId}
                                processPayment={(token, poNumber) =>
                                  handleProcessPayment(
                                    id,
                                    token,
                                    null,
                                    poNumber
                                  )
                                }
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                      {!!errorMessages && 
                        <Box
                          mb={3}
                          style={{ display: paymentFormError ? "block" : "none" }}
                          className={classes.gridspan}
                        >
                          <Alert severity="error">{errorMessages.map(message => <Box>{message}</Box>)}</Alert>
                        </Box>}
                      <Box mb={2}>
                        <Typography className={classes.title} variant="h6">
                          {intl.formatMessage(checkoutMessages.billingAddress)}
                        </Typography>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={billingAsShipping}
                            onChange={async () =>
                              await setBillingAsShippingAddress(
                                !billingAsShipping
                              )
                            }
                          />
                        }
                        label={intl.formatMessage(
                          checkoutMessages.sameAsShippingAddress
                        )}
                        style={{ marginBottom: "16px" }}
                      />
                      {!billingAsShipping && (
                        <>
                          <Box className={classes.fieldsGrid}>
                            <Field
                              required
                              autoComplete="billing given-name"
                              className={classes.textfield}
                              component={TextField}
                              name="billingFirstName"
                              label={intl.formatMessage(
                                commonMessages.firstName
                              )}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <Field
                              className={classes.textfield}
                              autoComplete="billing family-name"
                              component={TextField}
                              required
                              name="billingLastName"
                              label={intl.formatMessage(
                                commonMessages.lastName
                              )}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <Field
                              className={clsx(
                                classes.textfield,
                                classes.gridspan
                              )}
                              autoComplete="billing address-line1"
                              component={TextField}
                              required
                              name="billingStreetAddress1"
                              label={intl.formatMessage(
                                checkoutMessages.addressLine,
                                { number: 1 }
                              )}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            <Field
                              className={clsx(
                                classes.textfield,
                                classes.gridspan
                              )}
                              autoComplete="billing address-line2"
                              component={TextField}
                              name="billingStreetAddress2"
                              label={intl.formatMessage(
                                checkoutMessages.addressLine,
                                { number: 2 }
                              )}
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            {isAddressFieldRequired("city", "billing") && (
                              <Field
                                className={classes.textfield}
                                component={TextField}
                                required
                                name="billingCity"
                                autoComplete="billing address-level2"
                                label={intl.formatMessage(
                                  checkoutMessages.city
                                )}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                            {isAddressFieldRequired("state", "billing") && (
                              <Field
                                className={classes.textfield}
                                component={TextField}
                                name="billingCountryArea"
                                required
                                autoComplete="billing address-level1"
                                label={intl.formatMessage(
                                  checkoutMessages.stateProvinceArea
                                )}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                            {isAddressFieldRequired("zip", "billing") && (
                              <Field
                                className={classes.textfield}
                                component={TextField}
                                required
                                name="billingPostalCode"
                                label={intl.formatMessage(
                                  checkoutMessages.zipPostalCode
                                )}
                                autoComplete="billing postal-code"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                            {!!countries && (
                              <Field
                                className={classes.textfield}
                                component={TextField}
                                name="billingCountry"
                                label={intl.formatMessage(
                                  checkoutMessages.country
                                )}
                                variant="outlined"
                                required
                                // NEED TO FIGURE OUT HOW AUTOCOMPLETE INTERACTS WITH DROPDOWN SELECTOR
                                autoComplete="billing country"
                                InputLabelProps={{ shrink: true }}
                                select
                              >
                                {countries?.map((option) => (
                                  // @ts-ignore
                                  <MenuItem key={option.code} value={option}>
                                    {option.country}
                                  </MenuItem>
                                ))}
                              </Field>
                            )}
                          </Box>
                          <Box className={classes.fieldsGrid}>
                            <Field
                              className={classes.textfield}
                              component={TextField}
                              required
                              name="billingPhone"
                              label={intl.formatMessage(commonMessages.phone)}
                              type="tel"
                              autoComplete="billing tel-national"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            <Box
                              style={{
                                display: billingFormError ? "block" : "none",
                              }}
                              className={classes.gridspan}
                            >
                              <Alert severity="error">
                                {errorMessages
                                  ? errorMessages.map(message => <Box>{message}</Box>)
                                  : intl.formatMessage(
                                      commonMessages.pleaseEnsureAllRequiredFieldsAreEntered
                                    )}
                              </Alert>
                            </Box>
                          </Box>
                        </>
                      )}
                      <Box className={classes.fieldsGrid}>
                        <Button
                          disableRipple
                          disableElevation
                          className={classes.buttonText}
                          onClick={(e) => handleChange(e, "shipping")}
                        >
                          <KeyboardBackspaceIcon /> {intl.formatMessage(checkoutMessages.backToShipping)}
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          disableElevation
                          className={classes.button}
                          variant="contained"
                          disabled={isSubmitting || !availablePaymentGateways}
                        >
                          <LockIcon
                            style={{ height: 16, width: 16, marginRight: 12 }}
                          />{" "}
                          {isSubmitting ? (
                            <CircularProgress />
                          ) : (
                            intl.formatMessage(checkoutMessages.confirmPayment)
                          )}
                        </Button>
                      </Box>
                    </TabPanel>
                  </Form>
                );
              }}
            </Formik>
          </Box>
          <Box className={classes.cartSummary}>
            <CartSummary
              products={products}
              total={total}
              promoCode={promoCode}
              subtotal={subtotal}
              shipping={shipping}
              volumeDiscount={volumeDiscount}
              // onPaymentStep={onPaymentStep}
              loyaltyPoints={loyaltyPointsView}
            />
          </Box>
        </Box>
      ) : (
        <Box style={{ margin: "auto" }}>
          <Typography variant="h4">{intl.formatMessage(checkoutMessages.confirmingYourPayment)}</Typography>
          <Loader />
        </Box>
      )}
    </>
  );
};

export default MuiCheckout;
