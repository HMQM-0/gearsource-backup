import * as React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import "./scss/index.scss";

// import "slick-carousel/slick/slick-theme.scss";
// import "slick-carousel/slick/slick.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      color: "white",
      position: "relative",
      textAlign: "center",
    },
    content: {
      color: "#FFF",
      display: "inline",
      fontSize: "3rem",
      fontWeight: 900,
      left: "60%",
      paddingBottom: 10,
      paddingTop: 10,
      position: "absolute",
      textAlign: "center",
      textTransform: "uppercase",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    image: {
      height: "auto",
      width: "100%",
    },
    wrapper: {
      backgroundColor: "#000",
      overflow: "hidden",
    },
  })
);

export interface SliderProps {
  autoplay: boolean;
  autoplaySpeed: number;
  dots: boolean;
  infinite: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
}

export interface SlideProp {
  content: string;
  imageUrl: string;
  link?: string;
}

export interface HeroProps {
  backgroundColor?: string;
  // slides: SlideProp[];
  sliderSettings: SliderProps;
}

const HeroSlider: React.FC<HeroProps> = ({ sliderSettings, children }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.wrapper}>
        <Slider {...sliderSettings}>{children}</Slider>
      </Box>
    </>
  );
};

export default HeroSlider;

/*
{slides.map((slide, index) => {
            return (
              <Box key={index} className={classes.container}>
                <img
                  className={classes.image}
                  src={slide.imageUrl}
                  alt={index.toString()}
                />
                <Box className={classes.content}>
                  <h1>{slide.content}</h1>
                </Box>
              </Box>
            );
          })}
 */
