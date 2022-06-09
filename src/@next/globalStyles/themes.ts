import baseStyled, { ThemedStyledInterface } from "styled-components";

import * as C from "./constants";

export const defaultTheme = {
  breakpoints: {
    largeScreen: "992px",
    mediumScreen: "720px",
    smallScreen: "540px",
    xLargeScreen: "1280px",
    xxLargeScreen: "1600px",
    xxxLargeScreen: "1920px",
  },
  button: {
    animation: {
      transition: "0.3s",
    },
    colors: {
      primary: {
        activeBackground: C.theme.primaryDark,
        background: C.theme.primary,
        color: C.white,
        hoverBackground: C.theme.primaryDark,
        hoverColor: C.white,
      },
      secondary: {
        activeBackground: C.theme.secondaryDark,
        background: C.white,
        color: C.theme.secondary,
        hoverBackground: C.theme.secondary,
        hoverColor: C.white,
      },
    },
    padding: {
      main: "0.9rem 3.7rem",
      small: "0.9rem 1rem",
    },
    typography: {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.25rem",
      smallFontSize: "1rem",
      textTransform: "uppercase",
    },
  },
  carousel: {
    carouselControlPadding: "0.2rem 0.5rem",
    carouselControlShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
  },
  chip: {
    colors: {
      primary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.primaryLight,
        color: C.theme.primaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.primaryDark,
      },
      secondary: {
        activeBackground: C.theme.primaryTransparent,
        background: C.theme.secondaryLight,
        color: C.theme.secondaryDark,
        hoverBackground: "none",
        hoverColor: C.theme.secondaryDark,
      },
    },
    typography: {
      fontSize: "1rem",
      smallFontSize: "0.75rem",
    },
  },
  colors: {
    ...C.theme,
  },
  container: {
    width: 1140,
  },
  demoBanner: {
    height: "60px",
  },
  dropdown: {
    backgroundColor: C.theme.white,
    boxShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  grid: {
    containerWidth: 1140,
  },
  iconButton: {
    backgroundColor: C.theme.white,
    hoverBackgroundColor: C.theme.secondary,
    hoverForegroundColor: C.theme.white,
    size: 36,
  },
  input: {
    border: C.grayDark,
    labelColor: C.grayDark,
    /**
     * 12px in default theme
     */
    labelFontSize: "0.75rem",
    selectMenuShadow: "0px 6px 10px 0px rgba(0, 0, 0, 0.15)",
  },
  link: {
    base: {
      color: C.gray,
      hoverColor: C.grayMedium,
    },
    secondary: {
      color: C.blue,
      hoverColor: C.blueLight,
    },
  },
  message: {
    backgroundColor: C.white,
    contentMargin: `${C.spacer}rem 0 0`,
    letterSpacing: "0.5px",
    padding: "1rem 1.5rem",
    titleMargin: `0 ${C.spacer * 1.5}rem 0 0`,
    titleTransform: "uppercase",
    titleWeight: C.extraBoldFontWeight,
    width: "25rem",
  },
  modal: {
    modalMinHeight: 455,
    modalWidth: 555,
  },
  productItem: {
    productItemCategoryColor: C.gray,
    productItemPriceFontWeight: C.boldFontWeight,
    productItemPriceMargin: `${C.spacer}rem 0 0`,
    productItemTitleFontWeight: C.boldFontWeight,
    productItemTitleHeight: "2.5rem",
    productItemTitleMargin: `${C.spacer / 2}rem 0 0`,
    productItemTitleTextTransform: "uppercase",
  },
  spacing: {
    /**
     * 30px in default theme
     */
    fieldSpacer: C.fieldSpacer,
    /**
     * 30px in default theme
     */
    gutter: "1.875rem",
    /**
     * 16px in default theme
     */
    spacer: `${C.spacer}rem`,
  },
  tile: {
    backgroundColor: C.grayLight,
    divisionLine: C.grayMedium,
    hoverBorder: C.blueDark,
  },
  typography: {
    baseFontFamily: C.baseFontFamily,
    /**
     * 16px in default theme
     */
    baseFontSize: C.baseFontSize,
    /**
     * 20px in default theme
     */
    baseLineHeight: C.baseLineHeight,
    boldFontWeight: C.boldFontWeight,
    extraBoldFontWeight: C.extraBoldFontWeight,
    /**
     * 64px in default theme
     */
    h1FontSize: C.h1FontSize,
    h1LineHeight: C.h1LineHeight,
    /**
     * 48px in default theme
     */
    h2FontSize: C.h2FontSize,
    /**
     * 24px in default theme
     */
    h3FontSize: C.h3FontSize,
    /**
     * 18px in default theme
     */
    h4FontSize: C.h4FontSize,
    /**
     * 14px in default theme
     */
    smallFontSize: C.smallFontSize,
    /**
     * 96px in default theme
     */
    ultraBigFontSize: C.ultraBigFont,
  },
};

export interface ThemeType {
  breakpoints: {
    largeScreen: string;
    mediumScreen: string;
    smallScreen: string;
    xLargeScreen: string;
    xxLargeScreen: string;
    xxxLargeScreen: string;
  };
  button: {
    animation: {
      transition: string;
    };
    colors: {
      primary: {
        activeBackground: string;
        background: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
      };
      secondary: {
        activeBackground: string;
        background: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
      };
    };
    padding: {
      main: string;
      small: string;
    };
    typography: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
      smallFontSize: string;
      textTransform: string;
    };
  };
  carousel: {
    carouselControlPadding: string;
    carouselControlShadow: string;
  };
  chip: {
    colors: {
      primary: {
        activeBackground: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
      };
      secondary: {
        activeBackground: string;
        background: string;
        color: string;
        hoverBackground: string;
        hoverColor: string;
      };
    };
    typography: {
      fontSize: string;
      smallFontSize: string;
    };
  };
  colors: ThemeColor;
  container: {
    width: number;
  };
  dropdown: {
    backgroundColor: string;
    boxShadow: string;
  };
  grid: {
    containerWidth: number;
  };
  iconButton: {
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverForegroundColor: string;
    size: number;
  };
  input: {
    border: string;
    labelColor: string;
    /**
     * 12px in default theme
     */
    labelFontSize: string;
    selectMenuShadow: string;
  };
  link: {
    base: {
      color: string;
      hoverColor: string;
    };
    secondary: {
      color: string;
      hoverColor: string;
    };
  };
  message: {
    backgroundColor: string;
    contentMargin: string;
    letterSpacing: string;
    padding: string;
    titleMargin: string;
    titleTransform: string;
    titleWeight: string;
    width: string;
  };
  modal: {
    modalMinHeight: string;
    modalWidth: string;
  };
  productItem: {
    productItemCategoryColor: string;
    productItemPriceFontWeight: string;
    productItemPriceMargin: string;
    productItemTitleFontWeight: string;
    productItemTitleHeight: string;
    productItemTitleMargin: string;
    productItemTitleTextTransform: string;
  };
  spacing: {
    /**
     * 30px in default theme
     */
    fieldSpacer: string;
    /**
     * 30px in default theme
     */
    gutter: string;
    /**
     * 16px in default theme
     */
    spacer: string;
  };
  tile: {
    backgroundColor: string;
    divisionLine: string;
    hoverBorder: string;
  };
  typography: {
    baseFontFamily: string;
    /**
     * 16px in default theme
     */
    baseFontSize: string;
    /**
     * 20px in default theme
     */
    baseLineHeight: string;
    boldFontWeight: string;
    extraBoldFontWeight: string;
    /**
     * 64px in default theme
     */
    h1FontSize: string;
    h1LineHeight: string;
    /**
     * 48px in default theme
     */
    h2FontSize: string;
    /**
     * 24px in default theme
     */
    h3FontSize: string;
    /**
     * 18px in default theme
     */
    h4FontSize: string;
    /**
     * 14px in default theme
     */
    smallFontSize: string;
    /**
     * 96px in default theme
     */
    ultraBigFontSize: string;
  };
}

export interface ThemeColor {
  activeMenuOption: string;
  autofill: string;
  autofillSelected: string;
  bannerBackground: string;
  bannerEdge: string;
  bannerLink: string;
  baseFont: string;
  baseFontColorSemiTransparent: string;
  baseFontColorTransparent: string;
  dark: string;
  disabled: string;
  divider: string;
  dividerDark: string;
  error: string;
  hoverLightBackground: string;
  light: string;
  lightFont: string;
  listAttributeName: string;
  listBullet: string;
  overlay: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryTransparent: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  secondaryOverlay: string;
  secondaryOverlayDark: string;
  success: string;
  tabTitle: string;
  tableDivider: string;
  tabsBorder: string;
  thumbnailBorder: string;
  white: string;
}

export function createColorTheme(colors: ThemeColor) {
  const customTheme = defaultTheme;
  customTheme.colors = colors;
  return customTheme;
}

export type DefaultTheme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;
