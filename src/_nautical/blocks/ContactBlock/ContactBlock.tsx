import facebookIcon from "@temp/images/facebook-icon.svg";
import mediumIcon from "@temp/images/medium-icon.svg";
import React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import "./scss/index.scss";

interface ContactBlockProps {
  type: string;
  contact?: string;
  link?: string;
}

const ContactBlock: React.FC<ContactBlockProps> = ({ type, contact, link }) => {
  function createLinkWrapper(value) {
    if (link ? true : false) {
      return <a href={link}>{value}</a>;
    } else {
      return value;
    }
  }

  function createContactType() {
    switch (type) {
      case "phone":
        return createLinkWrapper(<PhoneIcon className="contact-icon" />);
      case "email":
        return createLinkWrapper(<MailOutlineIcon className="contact-icon" />);
      case "facebook":
        return createLinkWrapper(
          <ReactSVG className="contact-icon" src={facebookIcon} />
        );
      case "instagram":
        return createLinkWrapper(<InstagramIcon className="contact-icon" />);
      case "medium":
        return createLinkWrapper(
          <ReactSVG className="contact-icon" src={mediumIcon} />
        );
      case "twitter":
        return createLinkWrapper(<TwitterIcon className="contact-icon" />);
      default:
        return null;
    }
  }

  return (
    <Box className="contact-block">
      {createContactType()}
      {contact
        ? createLinkWrapper(<span className="contact-text">{contact}</span>)
        : ""}
    </Box>
  );
};

export default ContactBlock;
