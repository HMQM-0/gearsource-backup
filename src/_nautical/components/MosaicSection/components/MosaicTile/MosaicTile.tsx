import { ValueAction } from "@temp/_nautical/blocks";
import { ValueActionProps } from "@temp/_nautical/blocks/ValueAction";
import { BlockAlign, VerticalAlign } from "@temp/_nautical/types";
import * as React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
interface MosaicTileProps {
  blockAlign?: BlockAlign;
  imageUrl: string;
  valueActionProps?: ValueActionProps;
  verticalAlign?: VerticalAlign;
}

const MosaicTile: React.FC<MosaicTileProps> = ({
  blockAlign,
  imageUrl,
  valueActionProps,
  verticalAlign,
  children,
}) => {
  function createBlockAlignment() {
    let block = "";

    switch (blockAlign) {
      case "right":
        block = "mosaic-tile-right";
        break;
      case "center":
        block = "mosaic-tile-center";
        break;
      default:
        block = "mosaic-tile-left";
    }

    switch (verticalAlign) {
      case "bottom":
        block += " mosaic-tile-bottom";
        break;
      case "middle":
        block += " mosaic-tile-middle";
        break;
      default:
        block += " mosaic-tile-top";
    }

    return block;
  }

  return (
    <Box className="mosaic-tile-container">
      {imageUrl ? <img className="mosaic-tile-image" src={imageUrl} /> : null}
      <Box className={createBlockAlignment()}>
        <ValueAction {...valueActionProps} />
      </Box>
    </Box>
  );
};

export default MosaicTile;

//
