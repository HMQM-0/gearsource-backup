import { AppBar, Box } from "@mui/material";
import * as React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PublicIcon from "@mui/icons-material/Public";
import "./scss/index.scss";

interface IRewardBannerProps {}

const RewardBanner: React.FC<IRewardBannerProps> = (props) => {
  // const { content } = props;

  return (
    <AppBar
      className="reward_banner"
      position="static"
      style={{
        backgroundColor: "#9dc183",
        color: "white",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <PublicIcon color="secondary" className="reward-icon" />
        Sustainable and Rewarding
      </Box>
      <Box>|</Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <LoyaltyIcon color="secondary" className="reward-icon" />
        Join the Kuí Club
      </Box>
      <Box>|</Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <LocalShippingIcon color="secondary" className="reward-icon" />
        Free Shipping on $40 in AU
      </Box>
    </AppBar>
  );
};

export default RewardBanner;
