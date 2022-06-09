import { darken, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import {
  FormattedButton,
  FormattedText,
  TextAlign,
} from "@temp/_nautical/types";
import { Box } from "@mui/material";
import React from "react";
import "./scss/index.scss";

export interface ValueActionProps {
  align?: TextAlign;
  button?: FormattedButton;
  caption?: FormattedText;
  headline: FormattedText;
  offset?: string;
  proposition: FormattedText;
}

const ValueAction: React.FC<ValueActionProps> = ({
  align,
  button,
  caption,
  headline,
  offset,
  proposition,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        "&:hover": {
          backgroundColor: button
            ? button.hoverColor
              ? button.hoverColor
              : darken(
                  button.backgroundColor
                    ? button.backgroundColor
                    : theme.palette.primary.main,
                  0.2
                )
            : null,
        },
        "&>span": {
          color: button ? (button.color ? button.color : "#fff") : null,
          fontFamily: "inherit",
          fontSize: button ? (button.size ? button.size : "1rem") : null,
          fontWeight: button ? (button.weight ? button.weight : 700) : null,
        },
        backgroundColor: button
          ? button.backgroundColor
            ? button.backgroundColor
            : theme.palette.primary.main
          : null,
        border: "none",
        borderRadius: button ? (button.radius ? button.radius : 4) : null,
        height: button ? (button.height ? button.height : 48) : null,
        outline: "none",
        width: button ? (button.width ? button.width : 175) : null,
      },
      buttonText: {
        color: button ? (button.color ? button.color : "#fff") : null,
        fontFamily: "inherit",
        fontSize: button ? (button.size ? button.size : "1rem") : null,
        fontWeight: button ? (button.weight ? button.weight : 700) : null,
      },
      caption: {
        color: caption ? (caption.color ? caption.color : "#fff") : null,
        fontFamily: "inherit",
        fontSize: caption ? (caption.size ? caption.size : "0.75rem") : null,
        fontWeight: caption ? (caption.weight ? caption.weight : 400) : null,
        lineHeight: "250%",
        paddingBottom: caption ? (caption.spacing ? caption.spacing : 0) : null,
      },
      headline: {
        color: headline ? (headline.color ? headline.color : "#fff") : null,
        fontFamily: "inherit",
        fontSize: headline ? (headline.size ? headline.size : "1rem") : null,
        fontWeight: headline ? (headline.weight ? headline.weight : 700) : null,
        lineHeight: "100%",
        paddingBottom: headline
          ? headline.spacing
            ? headline.spacing
            : 0
          : null,
      },
      proposition: {
        color: proposition
          ? proposition.color
            ? proposition.color
            : "#fff"
          : null,
        fontFamily: "inherit",
        fontSize: proposition
          ? proposition.size
            ? proposition.size
            : "2rem"
          : null,
        fontWeight: proposition
          ? proposition.weight
            ? proposition.weight
            : 600
          : null,
        lineHeight: "100%",
        paddingBottom: proposition
          ? proposition.spacing
            ? proposition.spacing
            : 0
          : null,
      },
    })
  );

  function getAlignText() {
    switch (align) {
      case "right":
        return "value-align-right";
      case "center":
        return "value-align-center";
      default:
        return "value-align-left";
    }
  }

  function getOffset() {
    switch (offset) {
      case "1":
        return "value-offset-1";
      case "2":
        return "value-offset-2";
      case "3":
        return "value-offset-3";
      case "4":
        return "value-offset-4";
      case "5":
        return "value-offset-5";
      case "6":
        return "value-offset-6";
      case "7":
        return "value-offset-7";
      case "8":
        return "value-offset-8";
      case "9":
        return "value-offset-9";
      case "10":
        return "value-offset-10";
      default:
        return "";
    }
  }
  const classes = useStyles();

  const alignmentClasses = `${getAlignText() + " " + getOffset()}`;

  return (
    <Box className={alignmentClasses}>
      {headline ? (
        <Box className={classes.headline}>{headline.text}</Box>
      ) : null}
      {proposition ? (
        <Box className={classes.proposition}>{proposition.text}</Box>
      ) : null}
      {caption ? <Box className={classes.caption}>{caption.text}</Box> : null}
      {button ? (
        <button className={classes.button}>
          <span>{button.text}</span>
        </button>
      ) : null}
    </Box>
  );
};

export default ValueAction;
