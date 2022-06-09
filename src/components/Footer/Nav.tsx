// import footerImg from "@temp/images/footer.svg";
import { Loader } from "@components/atoms/Loader";
import { Spacer } from "@components/molecules/ProductTile/styles";
import { getMicrositeId, isMicrosite } from "@temp/core/utils";
import { TypedMicrositeQuery } from "@temp/views/Microsites/queries";
import * as React from "react";
import { Box, IconButton, Skeleton, Theme } from "@mui/material";
import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";
// import footerLogo from "@temp/images/footer-logo.png";
import fbIcon from "@temp/images/fb-icon.svg";
import igIcon from "@temp/images/ig-icon.svg";
import ttIcon from "@temp/images/tt-icon.svg";
import ytIcon from "@temp/images/yt-icon.svg";
import twIcon from "@temp/images/tw-icon.svg";
import "./scss/index.scss";
import { ReactSVG } from "react-svg";
import { makeStyles } from "@mui/styles";
import { maybe } from "@utils/misc";
import { useNavigate } from "react-router";
import { socialLinks } from "@temp/constants";

const useStyles = makeStyles((theme: Theme) => ({
  logoButton: {
    backgroundColor: "#fff",
    height: 68,
    width: 68,
    display: "flex",
    placeItems: "center",
    overflow: "hidden",
  },
  socialButton: {
    backgroundColor: "#fff",
    height: 36,
    width: 36,
    display: "flex",
    placeItems: "center",
    "& div > div": {
      display: "flex",
      placeItems: "center",
    },
    "& div > div > svg": {
      fill: "currentColor",
      color: theme.palette.secondary.main,
      height: 32,
      width: 32,
    },
  },
}));
interface INavProps {
  footerText?: string;
  icon?: React.ReactNode;
}

type SocialIconsKeys = keyof typeof socialLinks;
const socialLinksProps: Record<
  SocialIconsKeys,
  { ariaLabel: string; icon: string }
> = {
  FACEBOOK: {
    ariaLabel: "facebook",
    icon: fbIcon,
  },
  INSTAGRAM: {
    ariaLabel: "instagram",
    icon: igIcon,
  },
  YOUTUBE: {
    ariaLabel: "youtube",
    icon: ytIcon,
  },
  TIKTOK: {
    ariaLabel: "tiktok",
    icon: ttIcon,
  },
  TWITTER: {
    ariaLabel: "twitter",
    icon: twIcon,
  },
};

const SocialIcon = ({ socialIconKey }: { socialIconKey: SocialIconsKeys }) => {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.socialButton}
      aria-label={socialLinksProps[socialIconKey].ariaLabel}
      href={socialLinks[socialIconKey]}
    >
      <ReactSVG
        src={socialLinksProps[socialIconKey].icon}
        height="32"
        width="32"
      />
    </IconButton>
  );
};

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const { footerText, icon } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const socialIconsKeys: SocialIconsKeys[] = Object.keys(socialLinks)
    // Filter out social links that are not set
    .filter((socialLinkKey) => !!socialLinks[socialLinkKey]) as any;
  const half = Math.ceil(socialIconsKeys.length / 2);

  const socialIconsFirstHalf = socialIconsKeys.slice(0, half);
  const socialIconsSecondHalf = socialIconsKeys.slice(
    half,
    socialIconsKeys.length
  );
  // Render hidden icon to make everything look symmetric if left and right side are not the same
  const showEmptyIcon =
    socialIconsFirstHalf.length !== socialIconsSecondHalf.length;
  return (
    <footer className="footer-nav">
      <Box className="social-icons">
        {socialIconsFirstHalf.map((socialIconKey) => (
          <SocialIcon socialIconKey={socialIconKey} />
        ))}
        <IconButton
          className={classes.logoButton}
          aria-label="home page"
          onClick={() => navigate("/")}
        >
          {icon ? icon : <Skeleton />}
          {/* <img src={footerLogo} alt="Logo" height="64" width="64" /> */}
        </IconButton>
        {socialIconsSecondHalf.map((socialIconKey) => (
          <SocialIcon socialIconKey={socialIconKey} />
        ))}
        {showEmptyIcon && (
          <div
            className={classes.socialButton}
            style={{ backgroundColor: "transparent" }}
          />
        )}
      </Box>
      <Box className="container">
        <Box
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              return data.shop.navigation.secondary.items?.map((item) => (
                <Box className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    <NavLink item={item} />
                  </h4>
                  <Box className="footer-nav__section-content">
                    {item.children.map((subItem) => (
                      <p key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </Box>
                </Box>
              ));
            }}
          </TypedSecondaryMenuQuery>
        </Box>
        {!!isMicrosite() && (
          <TypedMicrositeQuery variables={{ id: getMicrositeId() }}>
            {({ data, error, loading }) => {
              if (data && !error && !loading) {
                return (
                  <Box style={{ textAlign: "center" }}>
                    {data.microsite?.footerText}
                  </Box>
                );
              }
              return <Loader />;
            }}
          </TypedMicrositeQuery>
        )}
      </Box>
      <Spacer />
      <Box className="container">
        <Box style={{ display: "block", width: "100%" }}>
          <Box>
            <hr />
          </Box>
          <Box className="footer-nav__section-caption">
            <Box>{maybe(() => footerText)}</Box>
            {/* <Box><a href="" target="" role="button" className="footer-nav__section-caption">Privacy Policy</a></Box>
          <Box><a href="" target="" role="button" className="footer-nav__section-caption">Terms of Use</a></Box> */}
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Nav;

/*

style={{
          backgroundImage: `url(${footerImg})`,
          backgroundSize: "cover",
        }}
*/
