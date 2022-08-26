import React from "react";
import PromoBanner from "@temp/_nautical/components/PromoBanner/PromoBanner";
import { ThemeFont } from "@temp/_nautical/components/ThemeFont/ThemeFont";
// import { useAuth } from "@nautical/sdk";
import { useAuth, useShopDetails } from "@nautical/react";
// import { DemoBanner, Loader } from "@components/atoms";
// import { demoMode } from "@temp/constants";
import {
 // Footer,
  // MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import "../globalStyles/scss/index.scss";
import { AppRoutes } from "./routes";
import Notifications from "./Notifications";
import CookieBar from "@temp/_nautical/components/CookieBar";
import { useAcceptCookies } from "@temp/hooks/useAcceptCookies";
import {
  Button,
  createTheme,
  CircularProgress,
  ThemeProvider,
  ThemeOptions,
  // useScrollTrigger,
  Skeleton,
} from "@mui/material";
// import MainMenu from "@temp/components/MainMenu/MainMenu";
import BottomNav from "@temp/components/MainMenu/BottomNav";
// import RewardBanner from "@temp/_nautical/components/RewardBanner/RewardBanner";
import TopNav from "@temp/components/MainMenu/TopNav";
import { useQuery } from "@apollo/client";
import { brandingQuery } from "./queries";
import { maybe } from "@utils/misc";
import { useNavigate } from "react-router";
import builder from "@builder.io/react";

// const CircularProgress = lazy(() => import("@mui/material/CircularProgress"));

// function load_favicon(url) {
//   if (url && url !== undefined && url !== null) {
//     const favicon = document.getElementById("favicon");
//     favicon.setAttribute("href", url);
//   }
// }

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const {
    data: shopData,
    loading: shopLoading,
    error: shopError,
  } = useShopDetails({
    fetchPolicy: "cache-and-network",
  });
  React.useMemo(() => {
    if (!shopLoading && !shopError && shopData) {
      // console.info("PREINITIALIZING BUILDER")
      // console.info(builder.sessionId)
      if (shopData.shop.builderKey) {
        builder.init(shopData.shop.builderKey);
      }
      if (shopData.shop.crispWebsiteId) {
        createCrispScript(shopData?.shop?.crispWebsiteId);
      }
      if (shopData.shop.gaMeasurementId) {
        createGoogleAnalyticsScript(shopData?.shop?.gaMeasurementId);
      }
    }
  }, [shopData, shopLoading, shopError]);

  // console.info("SHOP DATA")
  // console.info(shopData)
  const navigate = useNavigate();
  // const trigger = useScrollTrigger({
  //   // The header should always be visible on the mobile device
  //   disableHysteresis: window.innerWidth <= 768,
  // });
  const { data } = useQuery(brandingQuery, {
    fetchPolicy: "cache-and-network",
  });

  if (tokenRefreshing || tokenVerifying) {
    return <CircularProgress />;
  }

  function createCrispScript(crispWebsiteId: string) {
    // @ts-ignore
    window.$crisp = [];
    // @ts-ignore
    window.CRISP_WEBSITE_ID = crispWebsiteId;
    const d = window.document;
    const s = d.createElement("script");
    // @ts-ignore
    s.src = "https://client.crisp.chat/l.js";
    // @ts-ignore
    s.async = true;
    d.getElementsByTagName("head")[0].appendChild(s);
  }

  function createGoogleAnalyticsScript(gaMeasurementId: string) {
    const d = window.document;

    const s = d.createElement("script");
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + gaMeasurementId;
    s.async = true;
    d.getElementsByTagName("head")[0].appendChild(s);

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // @ts-ignore
      dataLayer.push(arguments);
    }
    // @ts-ignore
    gtag("js", new Date());
    // @ts-ignore
    gtag("config", gaMeasurementId);
  }

  const logo = data?.branding?.logo ? (
    <img
      src={data.branding.logo.url}
      width={maybe(() => data.branding.logoWidth, 188)}
      height={maybe(() => data.branding.logoHeight, 28)}
      onClick={() => navigate("/")}
      alt="Logo"
    />
  ) : (
    <Skeleton />
  );


  /* const icon = data?.branding?.icon ? (
    <img src={data.branding.icon.url} height="64" width="64" alt="Icon" />
  ) : null;
  const footerText = data?.branding?.footerText;*/


  const brandingActive = maybe(
    () => JSON.parse(data.branding.jsonContent).active,
    false
  ); 

  // load_favicon(data?.branding?.favicon?.url);

  const primaryColor = maybe(() =>
    brandingActive
      ? JSON.parse(data.branding.jsonContent).primaryColor
      : "#003563"
  );
  const secondaryColor = maybe(() =>
    brandingActive
      ? JSON.parse(data.branding.jsonContent).secondaryColor
      : "#B00631"
  );

  const theme: ThemeOptions = {
    palette: {
      action: { active: "#703412" },
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
      // secondary: { main: '#ba2c73' },
    },
    components: {
      MuiButton: {
        defaultProps: {},
        styleOverrides: {
          root: {
            borderRadius: 25,
            fontSize: "1.125rem",
            fontWeight: 700,
            padding: "12px 24px",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
          },
          outlined: {
            borderRadius: 25,
            borderWidth: "2px !important",
            padding: "8px 24px",
          },
        },
      },
    },
  };

  const stickyStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1100,
  };
  // const emptyStyle: React.CSSProperties = {};

  // const fillerStyle: React.CSSProperties = trigger
  //   ? { marginBottom: "104px" }
  //   : {};
  const fillerStyle: React.CSSProperties = { marginBottom: "133px" };

  return (
    <ShopProvider>
      <ThemeProvider theme={createTheme(theme)}>
        <OverlayProvider>
          <MetaConsumer />
          {/* demoMode && <DemoBanner />*/}
          <ThemeFont fontName="Playfair Display" />
          {/* <header style={trigger ? stickyStyle : emptyStyle}> */}
          <header style={stickyStyle}>
            <PromoBanner content="FREE SHIPPING over $50"  />
            <TopNav logo={logo} />
          </header>
          <div style={fillerStyle} />
          <AppRoutes logo={logo} />
          <BottomNav />
        {/* <Footer footerText={footerText} icon={icon} />*/}
          <CookieBar
            title=""
            description="This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to cookies being used."
            hide={acceptedCookies}
            action={
              <Button
                color="secondary"
                variant="contained"
                onClick={() => onAcceptCookies()}
              >
                Got it!
              </Button>
            }
          />
          <OverlayManager />
          <Notifications />
        </OverlayProvider>
      </ThemeProvider>
    </ShopProvider>
  );
};

export default App;