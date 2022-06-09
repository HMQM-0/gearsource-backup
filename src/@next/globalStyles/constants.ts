import { darken, lighten } from "@mui/material/styles";

// colors
export const autofillColor = "rgb(250, 255, 189)";
export const autofillColorSelected = "rgb(232, 240, 254)";
export const baseFontColor = "#323232";
export const baseFontColorSemiTransparent = "rgba(50,50,50,0.6)";
export const baseFontColorTransparent = "rgba(50,50,50,0.1)";
export const black = "#323232";
export const blue = "rgb(33,18,94)";
export const blueDark = "#190c4e";
export const blueLight = "#513CA3";
export const blueOverlay = `rgba(33,18,94,0.1)`;
export const blueOverlayDark = `rgba(33,18,94,0.2)`;
export const gray = "#7d7d7d";
export const grayMedium = "#c4c4c4";
export const grayDark = "#323232";
export const grayLight = "#f1f5f5";
export const green = "#3ed256";
export const overlayColor = "rgba(199, 207, 207, 0.8)";
export const primaryColor = "#0082a0";
export const rose = "#c22d74";
export const secondaryColor = "#ff9800";
export const turquoise = "#8bc34a";
export const turquoiseDark = "#618833";
export const turquoiseLight = "#76caf4";
export const turquoiseTransparent = "rgba(51, 177, 239, 0.1)";
export const white = "#fff";
export const tabelGray = "#eaeaea";
export const darkGreen = "#06847B";
export const secondaryGrey = "#EBF1F6";
export const secondaryGreyDark = "#9D9FB1";
export const secondaryBlue = "#036DFF";

// theme colors
export const theme = {
  activeMenuOption: blueDark,
  autofill: autofillColor,
  autofillSelected: autofillColorSelected,
  bannerBackground: secondaryGrey,
  bannerEdge: secondaryGreyDark,
  bannerLink: secondaryBlue,
  baseFont: baseFontColor,
  baseFontColorSemiTransparent,
  baseFontColorTransparent,
  dark: black,
  disabled: gray,
  divider: grayLight,
  dividerDark: grayMedium,
  error: rose,
  hoverLightBackground: turquoiseLight,
  light: grayLight,
  lightFont: gray,
  listAttributeName: baseFontColorSemiTransparent,
  listBullet: blueDark,
  overlay: overlayColor,
  primary: primaryColor,
  primaryDark: darken(primaryColor, 0.2),
  primaryLight: lighten(primaryColor, 0.2),
  primaryTransparent: turquoiseTransparent,
  secondary: secondaryBlue,
  secondaryDark: darken(secondaryBlue, 0.2),
  secondaryLight: lighten(secondaryBlue, 0.2),
  secondaryOverlay: blueOverlay,
  secondaryOverlayDark: blueOverlayDark,
  success: green,
  tabTitle: blueDark,
  tableDivider: tabelGray,
  tabsBorder: baseFontColorTransparent,
  thumbnailBorder: blueDark,
  white,
};

// typography
export const baseFontFamily = "'Inter', sans-serif";
export const baseFontSize = "1rem"; // 16px
export const baseLineHeight = "1.25rem"; // 20px
export const boldFontWeight = 600;
export const extraBoldFontWeight = 800;
export const h1FontSize = "4rem"; // 64px
export const h2FontSize = "3rem"; // 48px
export const h1LineHeight = 1;
export const h3FontSize = "1.5rem"; // 24px
export const h4FontSize = "1.125rem"; // 18px
export const labelFontSize = "0.75rem"; // 12px
export const smallFontSize = "0.875rem"; // 14px
export const ultraBigFont = "6rem"; // 96px

// spacing
export const spacer = 1; // rem
export const fieldSpacer = "1.875rem";

// breakpoints
export const xxxLargeScreen = 1920;
export const xxLargeScreen = 1600;
export const xLargeScreen = 1280;
export const largeScreen = 992;
export const mediumScreen = 720;
export const smallScreen = 540;
