import { isMicrosite } from "@temp/core/utils";
import * as React from "react";
import { Box } from "@mui/material";
import { INavItem, MobileNavList, Overlay, OverlayContextInterface } from "..";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const items: INavItem[] = overlay.context.data;

  return (
    !!!isMicrosite() && (
      <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
        <Box className="side-nav" onClick={(evt) => evt.stopPropagation()}>
          <MobileNavList items={items} hideOverlay={overlay.hide} />
        </Box>
      </Overlay>
    )
  );
};

export default MobileNav;
