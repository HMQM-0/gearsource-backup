/*
import {
  faFacebookF,
  faGithubAlt,
  faInstagram,
  faLinkedinIn,
  faMediumM,
  faRedditAlien,
  faSlack,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import "./scss/index.scss";

export enum ContactIconShape {
  circle = "circle",
  square = "square",
}

export interface ContactIconProps {
  backgroundColor?: string;
  fontColor?: string;
  hoverColor?: string;
  link?: string;
  onMouseDown?: any;
  radius?: number;
  size?: number;
  shape?: ContactIconShape;
  type: string;
}

const ContactIcon: React.FC<ContactIconProps> = ({
  backgroundColor,
  fontColor,
  hoverColor,
  link,
  radius,
  shape,
  size,
  type,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      link: {
        "&:hover >svg >circle": {
          fill: hoverColor ? hoverColor : backgroundColor,
        },
        "&:hover >svg >path": {
          fill: "#fff",
        },
      },
      shape: {
        fill: backgroundColor ? backgroundColor : "#000",
      },
    })
  );

  const classes = useStyles();

  function createLinkWrapper(value) {
    if (link ? true : false) {
      return <a href={link}>{value}</a>;
    } else {
      return value;
    }
  }

  function createFontIcon() {
    switch (type) {
      case "close": {
        return <FontAwesomeIcon className="contact-icon" icon={faTimes} />;
      }
      case "phone":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            icon={faPhone}
            flip="horizontal"
          />
        );
      case "email":
        return <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />;
      case "facebook":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faFacebookF}
          />
        );
      case "github":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faGithubAlt}
          />
        );
      case "linkedin":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faLinkedinIn}
          />
        );
      case "instagram":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.75,
              width: size * 0.75,
            }}
            icon={faInstagram}
          />
        );
      case "medium":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faMediumM}
          />
        );
      case "reddit":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faRedditAlien}
          />
        );
      case "slack":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.6,
              width: size * 0.6,
            }}
            icon={faSlack}
          />
        );
      case "twitter":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.55,
              width: size * 0.55,
            }}
            icon={faTwitter}
          />
        );
      case "youtube":
        return (
          <FontAwesomeIcon
            className="contact-icon"
            style={{
              color: fontColor ? fontColor : "white",
              height: size * 0.66,
              width: size * 0.66,
            }}
            icon={faYoutube}
          />
        );
      default:
        return null;
    }
  }

  function createShape() {
    let innerSVG = <circle cx="50" cy="50" r="50" />;

    switch (shape) {
      case "circle":
        innerSVG = <circle cx="50" cy="50" r="50" className={classes.shape} />;
        break;
      case "square":
        innerSVG = (
          <rect
            cx="50"
            cy="50"
            r={radius ? radius : 0}
            className={classes.shape}
          />
        );
        break;
    }

    return (
      <Box className="contact-container" style={{ height: size, width: size }}>
        <a href={link} className={classes.link}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {innerSVG}
          </svg>
          {createFontIcon()}
        </a>
      </Box>
    );
  }

  function createContactType() {
    switch (type) {
      case "phone":
        return createLinkWrapper(
          <FontAwesomeIcon
            className="contact-icon"
            icon={faPhone}
            flip="horizontal"
          />
        );
      case "email":
        return createLinkWrapper(
          <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />
        );
      case "facebook":
        return createLinkWrapper(
          <FontAwesomeIcon className="contact-icon" icon={faFacebookF} />
        );
      case "instagram":
        return createLinkWrapper(
          <FontAwesomeIcon className="contact-icon" icon={faInstagram} />
        );
      case "medium":
        return createLinkWrapper(
          <FontAwesomeIcon className="contact-icon" icon={faMediumM} />
        );
      case "twitter":
        return createLinkWrapper(
          <FontAwesomeIcon className="contact-icon" icon={faTwitter} />
        );
      default:
        return null;
    }
  }

  return (
    <Box style={{ height: size, width: size }}>
      {shape ? createShape() : createContactType()}
    </Box>
  );
};

export default ContactIcon;
*/
