// import { Theme } from "@mui/material";
// import { createStyles, makeStyles } from "@mui/styles"';
import { ValueAction } from "@temp/_nautical/blocks";
import { ValueActionProps } from "@temp/_nautical/blocks/ValueAction";
import { BlockAlign } from "@temp/_nautical/types";
import { Box } from "@mui/material";
import React from "react";
import "./scss/index.scss";

export interface SlideValueActionButtonProps {
  blockAlign?: BlockAlign;
  imageUrl?: string;
  margin?: string;
  valueActionProps?: ValueActionProps;
}

const SlideValueActionButton: React.FC<SlideValueActionButtonProps> = ({
  blockAlign,
  imageUrl,
  margin,
  valueActionProps,
}) => {
  /*
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      block: {
        left: "10%",
        position: "absolute",
        right: "10%",
        top: "50%",
      },
    })
  );

  const classes = useStyles();
  */

  function createBlockAlignment() {
    switch (blockAlign) {
      case "left":
        return "hero-left";
      case "right":
        return "hero-right";
      case "center":
        return "hero-center";
    }
  }

  /*
  function createOffsets() {
    let style = { left: "25px", right: "25px" };

    lenftOj,nmOffset ? (style.right = rightOffset) : null;
n
       return style;
  }
*/

  return (
    <Box className="hero-container">
      {imageUrl ? <img className="hero-image" src={imageUrl} /> : null}
      <Box className={createBlockAlignment()}>
        <ValueAction {...valueActionProps} />
      </Box>
    </Box>
  );
};

export default SlideValueActionButton;
