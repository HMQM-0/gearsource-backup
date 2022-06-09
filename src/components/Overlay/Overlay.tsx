import "./scss/index.scss";

import clsx from "clsx";
import * as React from "react";
import { Box } from "@mui/material";
import { OverlayContextInterface } from "./context";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
  /**
   * Unique name used as selector for writing e2e tests in Cypress	   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide },
  testingContext,
}) => (
  <Box
    className={clsx("overlay", {
      [`overlay--${type}`]: !!type,
      [className]: !!className,
    })}
    data-test={testingContext}
    onClick={hide}
  >
    <Box className={`overlay__${theme}`} onClick={(e) => e.stopPropagation()}>
      {children}
    </Box>
  </Box>
);

export default Overlay;
