import "./scss/index.scss";

import badge from "images/sale_badge_red.svg";
import banner from "images/sale_banner_red.svg";
import corner from "images/sale_corner_red.svg";
import diamond from "images/sale_diamond_red.svg";
import hexagon from "images/sale_hexagon_red.svg";

import * as React from "react";
import { ReactSVG } from "react-svg";

interface SaleBadgeProps {
  color?: string;
  disabled?: boolean;
  path?: string;
  type?: string;
}

const SaleBadge: React.FC<SaleBadgeProps> = (props) => {
  const { disabled, type } = props;

  function getBadge() {
    switch (type) {
      case "badge":
        return badge;
      case "banner":
        return banner;
      case "diamond":
        return diamond;
      case "hexagon":
        return hexagon;
      default:
        return corner;
    }
  }

  const saleBadge = getBadge();

  return (
    <>
      {disabled ? (
        ""
      ) : (
        <ReactSVG src={saleBadge} className="product__salebadge" />
      )}
    </>
  );
};

export default SaleBadge;
