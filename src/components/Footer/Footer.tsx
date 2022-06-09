// import { ContactIcon, ContactIconShape } from "@temp/_nautical/blocks";
import * as React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
// import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";
import { isMicrosite } from "@temp/core/utils";

interface FooterProps {
  footerText?: string;
  icon?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { footerText, icon } = props;
  return (
    <Box className="footer" id="footer">
      {!!!isMicrosite() && (
        <Box className="footer__favicons container">
          {SOCIAL_MEDIA.map((medium) => (
            <Box
              className="social-icon"
              key={medium.ariaLabel}
              style={{ display: "none" }}
            >
              {/*
            <ContactIcon
              backgroundColor="#21125e"
              hoverColor="#26b2e3"
              link={medium.href}
              shape={ContactIconShape.circle}
              type={medium.ariaLabel}
              size={36}
            />
            */}
            </Box>
          ))}
        </Box>
      )}
      {!!isMicrosite() && <Box pt={1} />}
      <Nav footerText={footerText} icon={icon} />
    </Box>
  );
};

export default Footer;
