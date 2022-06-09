import { Divider, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { FormattedText, TextAlign } from "@temp/_nautical/types";
import * as React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
export interface SectionDividerProps {
  textAlign?: TextAlign;
  divider?: boolean;
  header: FormattedText;
  caption?: FormattedText;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  divider,
  header,
  caption,
  textAlign,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      caption: {
        color: caption ? (caption.color ? caption.color : "#888") : null,
        display: "block",
        fontSize: caption ? (caption.size ? caption.size : "1.15rem") : null,
        fontWeight: caption ? (caption.weight ? caption.weight : 400) : null,
        paddingTop: 10,
        textAlign: caption
          ? caption.align
            ? caption.align
            : TextAlign.center
          : null,
        textTransform: caption
          ? caption.transform
            ? caption.transform
            : "none"
          : null,
      },
      container: {
        display: "block",
        marginBottom: 5,
        marginTop: 20,
        textAlign: textAlign ? textAlign : TextAlign.center,
      },
      header: {
        color: header.color ? header.color : "#000",
        display: "block",
        fontSize: header.size ? header.size : "2.5rem",
        fontWeight: header.weight ? header.weight : 700,
        marginBottom: 5,
        textAlign: header.align ? header.align : TextAlign.center,
        textTransform: header.transform ? header.transform : "none",
      },
    })
  );

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <span className={classes.header}>{header.text}</span>
      {caption ? (
        <Box>
          <span className={classes.caption}>{caption.text}</span>
        </Box>
      ) : null}
      {divider ? <Divider /> : null}
    </Box>
  );
};

export default SectionDivider;
