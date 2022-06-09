/*
import { SliderLazyLoadOptions, SliderSettings } from "@temp/_nautical/types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from "react";
import Slider from "react-slick";
import "./scss/index.scss";

interface PromoSliderProps {
  sliderSettings?: SliderSettings;
}

const PromoSlider: React.FC<PromoSliderProps> = ({
  sliderSettings,
  children,
}) => {
  function createSettings() {
    let settings: SliderSettings = null;

    if (sliderSettings ? true : false) {
      settings = {
        arrows: sliderSettings.arrows ? sliderSettings.arrows : true,
        autoplay: sliderSettings.autoplay ? sliderSettings.autoplay : false,
        autoplaySpeed: sliderSettings.autoplaySpeed
          ? sliderSettings.autoplaySpeed
          : 5000,
        dots: sliderSettings.dots ? sliderSettings.dots : true,
        infinite: sliderSettings.infinite ? sliderSettings.infinite : true,
        lazyLoad: sliderSettings.lazyLoad
          ? sliderSettings.lazyLoad
          : SliderLazyLoadOptions.progressive,
        rtl: sliderSettings.rtl ? sliderSettings.rtl : false,
        slidesToScroll: sliderSettings.slidesToScroll
          ? sliderSettings.slidesToScroll
          : 1,
        slidesToShow: sliderSettings.slidesToShow
          ? sliderSettings.slidesToShow
          : 3,
        speed: sliderSettings.speed ? sliderSettings.speed : 1000,
        vertical: sliderSettings.vertical ? sliderSettings.vertical : false,
      };
    } else {
      // Default Settings if SliderSettings not presented
      settings = {
        arrows: true,
        autoplay: false,
        autoplaySpeed: 5000,
        dots: true,
        infinite: true,
        lazyLoad: SliderLazyLoadOptions.progressive,
        rtl: false,
        slidesToScroll: 1,
        slidesToShow: 3,
        speed: 1000,
        vertical: false,
      };
    }

    return settings;
  }

  const defaultSettings: SliderSettings = createSettings();

  return (
    <>
      <Box className="promo-slider-container">
        <Slider ref={(c) => (this.slider = c)} {...defaultSettings}>
          {children}
        </Slider>
        {defaultSettings.dots ? (
          <Box className="promo-slider-dots"></Box>
        ) : null}
        {defaultSettings.arrows ? (
          <Box className="promo-arrow-container">
            <ArrowBackIosIcon
              className="promo-arrow-left"
              onClick={() => this.slider.slickPrev()}
            />
            <ArrowForwardIosIcon
              className="promo-arrow-right"
              onClick={() => this.slider.slickNext()}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default PromoSlider;
*/
