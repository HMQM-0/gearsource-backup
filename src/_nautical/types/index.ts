export enum BlockAlign {
  center = "center",
  left = "left",
  right = "right",
}

export enum VerticalAlign {
  top = "top",
  middle = "middle",
  bottom = "bottom",
}

export interface FormattedText {
  align?: TextAlign;
  color?: string;
  size?: string;
  text: string;
  spacing?: number;
  weight?: number;
  transform?: TextTransform;
  underline?: boolean;
}

export interface FormattedButton extends FormattedText {
  backgroundColor?: string;
  height?: number;
  hoverColor?: string;
  link?: string;
  radius?: number;
  shape?: string;
  width?: number;
}

export enum SliderLazyLoadOptions {
  ondemand = "ondemand",
  progressive = "progressive",
}

export interface SliderSettings {
  arrows?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  lazyLoad?: SliderLazyLoadOptions;
  infinite?: boolean;
  rtl?: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
  vertical?: boolean;
  slickNext?(): void;
  slickPrev?(): void;
}

export enum TextAlign {
  center = "center",
  left = "left",
  right = "right",
}

export enum TextTransform {
  capitalize = "capitalize",
  lowercase = "lowercase",
  uppercase = "uppercase",
}
