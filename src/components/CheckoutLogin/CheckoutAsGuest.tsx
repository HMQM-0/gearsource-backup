import { Button } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { OverlayTheme, OverlayType } from "..";
import { OverlayContextInterface } from "../Overlay";

const CheckoutAsGuest: React.FC<{
  overlay: OverlayContextInterface;
  checkoutUrl: string;
}> = ({ overlay, checkoutUrl }) => (
  <Box className="checkout-login__guest">
    <h3 className="checkout__header">
      <FormattedMessage defaultMessage="Continue as a guest" />
    </h3>
    <p>
      <FormattedMessage defaultMessage="If you don’t wish to register an account, don’t worry. You can checkout as a guest. We care about you just as much as any registered user." />
    </p>
    <Link to={checkoutUrl}>
      <Button variant="contained" fullWidth color="secondary">
        <FormattedMessage defaultMessage="Continue as a guest" />
      </Button>
      {/*
      <Button testingContext="continueAsGuestButton">
        <FormattedMessage defaultMessage="Continue as a guest" />
      </Button>
      */}
    </Link>

    <p>
      <FormattedMessage defaultMessage="or you can" />{" "}
      <Box
        component="span"
        data-test="showRegisterOverlay"
        className="u-link"
        onClick={() => overlay.show(OverlayType.register, OverlayTheme.right)}
      >
        <FormattedMessage defaultMessage="create an account" />
      </Box>
    </p>
  </Box>
);

export default CheckoutAsGuest;
