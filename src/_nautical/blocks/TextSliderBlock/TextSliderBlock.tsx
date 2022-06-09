import React from "react";
import Slider from "react-slick";

interface TextSliderProps {
  arrows?: boolean;
  autoplay: boolean;
  autoplaySpeed?: number;
  backgroundColor?: string;
  hasDots?: boolean;
  isInfinite: boolean;
  slides: any;
  slideSpeed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  textColor?: string;
  width: string;
}

const TextSliderBlock: React.FC<TextSliderProps> = ({
  arrows,
  autoplay,
  autoplaySpeed,
  backgroundColor,
  hasDots,
  isInfinite,
  slides,
  slideSpeed,
  slidesToScroll,
  slidesToShow,
  textColor,
  width,
}) => {
  const settings = {
    arrows: arrows ? arrows : false,
    autoplay,
    autoplaySpeed: autoplaySpeed ? autoplaySpeed : 5000,
    dots: hasDots ? hasDots : false,
    infinite: isInfinite,
    slidesToScroll: slidesToScroll ? slidesToScroll : 1,
    slidesToShow: slidesToShow ? slidesToShow : 1,
    speed: slideSpeed ? slideSpeed : 500,
  };

  function createStyle() {
    const color = textColor ? { color: textColor } : { color: "#FFF" };
    const barColor = backgroundColor
      ? { backgroundColor }
      : { backgroundColor: "#000055" };
    const sliderWidth = { width };
    const textAlign = { textAlign: "center" };

    return { barColor, color, sliderWidth, textAlign };
  }

  return (
    <Slider style={createStyle()} {...settings}>
      {slides ? slides : ""}
    </Slider>
  );
};

export default TextSliderBlock;

// <Slider style={{ width: width, textAlign: "center" }} {...settings}>
