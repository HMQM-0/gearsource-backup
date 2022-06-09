import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "./scss/index.scss";

export interface NotificationSliderProps {
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  dots: boolean;
  infinite: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
}

export interface MessageProp {
  content: string;
  link?: string;
}

export interface NotificationProps {
  backgroundColor?: string;
  hasClose?: boolean;
  fontColor?: string;
  fontSize?: string;
  messages: MessageProp[];
  sliderSettings?: NotificationSliderProps;
}

const NotificationBar: React.FC<NotificationProps> = ({
  backgroundColor,
  fontColor,
  fontSize,
  hasClose,
  messages,
  sliderSettings,
}) => {
  const [close, setClose] = useState("block");

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      closeButton: {
        color: fontColor ? fontColor : "#FFF",
        position: "absolute",
        right: 20,
        top: 10,
        zIndex: 100,
      },
      message: {
        color: fontColor ? fontColor : "#FFF",
        fontSize: fontSize ? fontSize : "1rem",
        paddingBottom: 2,
        paddingTop: 0,
        textAlign: "center",
      },
      wrapper: {
        border: 0,
        overflow: "hidden",
      },
    })
  );

  const classes = useStyles();

  function closeBar() {
    // stop the autoplay and hide the NotificationBar
    sliderSettings.autoplay = false;
    setClose("none");
  }

  return (
    <>
      <Box
        className={classes.wrapper}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "#000",
          display: close,
        }}
      >
        {hasClose ? (
          <IconButton
            className={classes.closeButton}
            onClick={() => closeBar()}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          ""
        )}
        <Slider {...sliderSettings}>
          {messages.map((message, index) => {
            return (
              <Box className={classes.message} key={index}>
                <span>{message.content}</span>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </>
  );
};

export default NotificationBar;
