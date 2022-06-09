import { ValueAction } from "@temp/_nautical/blocks";
import { ValueActionProps } from "@temp/_nautical/blocks/ValueAction";
import React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
export interface PromoCardProps {
  imageUrl?: string;
  valueActionProps: ValueActionProps;
}

const PromoCard: React.FC<PromoCardProps> = ({
  imageUrl,
  valueActionProps,
}) => {
  return (
    <Box className="promo-container">
      {imageUrl ? (
        <a className="promo-image-box">
          <img className="promo-image" src={imageUrl} />
        </a>
      ) : null}
      <Box>
        <ValueAction {...valueActionProps} />
      </Box>
    </Box>
  );
};

export default PromoCard;
