import CSS from "csstype";
import React from "react";

export interface IImage {
  style?: CSS.Properties;
  url?: string;
  url2x?: string;
  alt?: string;
  children?: React.ReactElement;
  defaultImage?: string;
  height?: string;
  width?: string;
}
