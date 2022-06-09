import nauticalProp from "@temp/images/nautical-prop.svg";
import * as React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";
import "./scss/index.scss";

const Loader: React.FC<{ full?: boolean }> = ({ full }) => {
  const getHeight = () => {
    const headerHeight =
      document.getElementById("header") &&
      document.getElementById("header").offsetHeight;
    const footerHeight =
      document.getElementById("footer") &&
      document.getElementById("footer").offsetHeight;
    return window.innerHeight - headerHeight - footerHeight;
  };

  return (
    <Box className="loader" style={full && { height: getHeight() }}>
      <ReactSVG src={nauticalProp} className={"loader__item"} />
    </Box>
  );
};

export default Loader;
