import { Box, BoxProps } from "@mui/system";
import React from "react";

const FlexBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

FlexBox.defaultProps = {
  display: "flex",
};

export default FlexBox;
