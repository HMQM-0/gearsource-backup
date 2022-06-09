import * as React from "react";
// @ts-ignore
import * as Sentry from "@sentry/react";
// @ts-ignore
import { Integrations } from "@sentry/tracing";
import { positions, Provider as AlertProvider } from "react-alert";
import { render } from "react-dom";
// import TagManager from "react-gtm-module";
import { hot } from "react-hot-loader";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { QueryParamProvider } from "use-query-params";
// import { ThemeProvider, createTheme } from "@mui/material";
import { NotificationTemplate } from "@components/atoms";
import { ServiceWorkerProvider } from "@components/containers";
// import { NauticalProvider } from "@nautical/sdk";
import { NauticalProvider } from "@nautical/react";
// import { ConfigInput } from "@nautical/sdk/lib/types";
import { ConfigInput } from "@nautical/types";
import { defaultTheme, GlobalStyle } from "@styles";

import { App } from "./app";
import { LocaleProvider } from "./components/Locale";
import {
  apiUrl,
  sentryDsn,
  sentryEnvironment,
  sentrySampleRate,
  serviceWorkerTimeout,
  sentryRelease,
} from "./constants";
// import { history } from "./history";
import { WishlistProvider } from "./@nautical/react/components/WishlistProvider";

const NAUTICAL_CONFIG: ConfigInput = {
  apiUrl,
};

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

/*
if (process.env.GTM_ID !== undefined) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}
*/

const startApp = async () => {
  if (sentryDsn !== undefined) {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [new Integrations.BrowserTracing()],
      release: sentryRelease,
      tracesSampleRate: sentrySampleRate,
      environment: sentryEnvironment,
    });
  }

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 3000,
  };

  const Root = hot(module)(() => {
    return (
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <NauticalProvider config={NAUTICAL_CONFIG}>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </NauticalProvider>
        </QueryParamProvider>
      </BrowserRouter>
    );
  });

  render(
    <>
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <ThemeProvider theme={defaultTheme}>
          <AlertProvider
            template={NotificationTemplate as any}
            {...notificationOptions}
          >
            <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
              <LocaleProvider>
                <GlobalStyle />
                <Root />
              </LocaleProvider>
            </ServiceWorkerProvider>
          </AlertProvider>
        </ThemeProvider>
      </Sentry.ErrorBoundary>
    </>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
  }
};

startApp();
