import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import { ContactBlock, TextSliderBlock } from "../../blocks";
import "./scss/index.scss";
import { Box } from "@mui/material";
interface OfferBarProps {
  backgroundColor: string;
  contact: string;
  data: any;
  emailAddress: string;
  facebookLink: string;
  fontColor: string;
  fontSize: string;
  instagramLink: string;
  mediumLink: string;
  phoneNumber: string;
  twitterLink: string;
}

const OfferBar: React.FC<OfferBarProps> = ({
  backgroundColor,
  contact,
  data,
  phoneNumber,
  emailAddress,
  facebookLink,
  instagramLink,
  mediumLink,
  twitterLink,
  fontColor,
  fontSize,
}) => {
  const CloseButton = <CloseIcon />;

  function createContactBlock(prop, type) {
    if (prop ? true : false) {
      return <ContactBlock type={type} contact={prop} />;
    } else {
      return "";
    }
  }

  const EmailBlock = createContactBlock(emailAddress, "email");
  const FacebookBlock = createContactBlock(facebookLink, "facebook");
  const InstagramBlock = createContactBlock(instagramLink, "instagram");
  const MediumBlock = createContactBlock(mediumLink, "medium");
  const PhoneBlock = createContactBlock(phoneNumber, "phone");
  const TwitterBlock = createContactBlock(twitterLink, "twitter");

  function sideClass() {
    if (contact) {
      return "col-md-3";
    } else {
      return "col-md-1";
    }
  }

  function sliderClass() {
    if (contact) {
      return "col-md-6";
    } else {
      return "col-md-10";
    }
  }

  const slides = data.map((data) => {
    return <span key={data.text}>{data.text}</span>;
  });

  const TextSlider = (
    <TextSliderBlock
      isInfinite={true}
      autoplay={true}
      autoplaySpeed={2000}
      slides={slides}
      width="100%"
    />
  );

  return (
    <Box
      className="row offer-bar pl-2 pr-2"
      style={{
        backgroundColor: `${backgroundColor ? backgroundColor : "black"}`,
        color: `${fontColor ? fontColor : "white"}`,
        fontSize: `${fontSize ? fontSize + "em" : "1.0em"}`,
      }}
    >
      <Box className={sideClass()}>
        <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
          {contact ? PhoneBlock : ""}
        </Box>
      </Box>
      <Box className={sliderClass()}>{TextSlider}</Box>
      <Box className={sideClass()}>
        {contact ? (
          <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
            {EmailBlock}
            {FacebookBlock}
            {InstagramBlock}
            {MediumBlock}
            {TwitterBlock}
          </Box>
        ) : (
          ""
        )}
        {contact ? "" : CloseButton}
      </Box>
    </Box>
  );
};

export default OfferBar;
