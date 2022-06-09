import "./scss/index.scss";
import { Box } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
  PasswordResetRequestForm,
} from "../..";

import closeImg from "../../../images/x.svg";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => (
  <Overlay testingContext="passwordOverlay" context={overlay}>
    <Box className="password-reset">
      <Online>
        <Box className="overlay__header">
          <p className="overlay__header-text">
            <FormattedMessage defaultMessage="Reset your password" />
          </p>
          <ReactSVG
            src={closeImg}
            onClick={overlay.hide}
            className="overlay__header__close-icon"
          />
        </Box>
        <Box className="password-reset__content">
          <PasswordResetRequestForm />
        </Box>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </Box>
  </Overlay>
);

export default Password;
