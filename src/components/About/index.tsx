import "./scss/index.scss";
import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { appVersion, sentryDsn, sentryEnvironment } from "@temp/constants";

const About = () => (
  <Box className="about-page">
    <h2 className="about-page__header">
      <FormattedMessage defaultMessage="About" />
    </h2>
    <Box className="about-page__ruler" />
    <Box className="about-page__message">
      <p>
        <strong>
          <FormattedMessage defaultMessage="Version" />:
        </strong>{" "}
        {appVersion}
      </p>
      <p>
        <strong>
          <FormattedMessage defaultMessage="Sentry Integration" />:
        </strong>{" "}
        {sentryDsn ? "Enabled" : "Disabled"}
      </p>
      <p>
        <strong>
          <FormattedMessage defaultMessage="Sentry Environment" />:
        </strong>{" "}
        {sentryEnvironment}
      </p>
    </Box>
  </Box>
);

export default About;
