import React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";
const ForgottenPassword: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <>
    <Box className="login__content__password-reminder">
      <p>
        <FormattedMessage defaultMessage="Have you forgotten your password?" />{" "}
        <Box
          component="span"
          className="u-link"
          onClick={onClick}
          data-test="accountOverlayForgottenPasswordLink"
        >
          <FormattedMessage defaultMessage="Click Here" />
        </Box>
      </p>
    </Box>
  </>
);

export default ForgottenPassword;
