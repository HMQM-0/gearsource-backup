import { Box, Button } from "@mui/material";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import * as React from "react";
interface IPromoPopupProps {
  disabled?: boolean;
}

const PromoPopup: React.FC<IPromoPopupProps> = (props) => {
  return (
    <OverlayContext.Consumer>
      {(overlayContext) => (
        <>
          <Button
            onClick={() =>
              overlayContext.show(OverlayType.modal, OverlayTheme.modal, {
                content: (
                  <Box
                    style={{
                      backgroundColor: "#000033",
                      height: 455,
                      width: 555,
                    }}
                  >
                    &nbsp;
                  </Box>
                ),
              })
            }
            // testingContext="promoPopupButton"
          >
            Test Me
          </Button>
        </>
      )}
    </OverlayContext.Consumer>
  );
};

export default PromoPopup;
